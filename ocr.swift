import Foundation
import Vision
import ImageIO
import AppKit

guard CommandLine.arguments.count > 1 else {
    print("Usage: swift ocr.swift <image-path>")
    exit(1)
}

let imagePath = CommandLine.arguments[1]
let url = URL(fileURLWithPath: imagePath)

guard let imageSource = CGImageSourceCreateWithURL(url as CFURL, nil),
      let cgImage = CGImageSourceCreateImageAtIndex(imageSource, 0, nil) else {
    print("Failed to load CGImage from \(imagePath)")
    exit(1)
}

let width = cgImage.width
let height = cgImage.height

// Create a Core Graphics context with a white background to flatten transparency
let colorSpace = CGColorSpaceCreateDeviceRGB()
guard let context = CGContext(
    data: nil,
    width: width,
    height: height,
    bitsPerComponent: 8,
    bytesPerRow: width * 4,
    space: colorSpace,
    bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue
) else {
    print("Failed to create CGContext")
    exit(1)
}

context.setFillColor(red: 1.0, green: 1.0, blue: 1.0, alpha: 1.0)
context.fill(CGRect(x: 0, y: 0, width: width, height: height))
context.draw(cgImage, in: CGRect(x: 0, y: 0, width: width, height: height))

guard let flatImage = context.makeImage() else {
    print("Failed to make flat image")
    exit(1)
}

let requestHandler = VNImageRequestHandler(cgImage: flatImage, options: [:])
let request = VNRecognizeTextRequest { (request, error) in
    if let error = error {
        print("Error in request: \(error)")
        return
    }
    guard let observations = request.results as? [VNRecognizedTextObservation] else {
        print("No observations result")
        return
    }
    for observation in observations {
        if let candidate = observation.topCandidates(1).first {
            print(candidate.string)
        }
    }
}

request.recognitionLevel = .accurate
request.usesLanguageCorrection = true

do {
    try requestHandler.perform([request])
} catch {
    print("Failed to perform request: \(error)")
}
