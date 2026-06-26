import Vision
import ImageIO
import Foundation

let path = "/Users/faruknafizfazlioglu/.gemini/antigravity-ide/brain/10b682ad-29e6-4969-ac97-5a205d7229af/media__1782388067019.png"
let url = URL(fileURLWithPath: path)
guard let src = CGImageSourceCreateWithURL(url as CFURL, nil),
      let img = CGImageSourceCreateImageAtIndex(src, 0, nil) else {
    print("failed to load image")
    exit(1)
}

let width = img.width
let height = img.height
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
    print("failed to create context")
    exit(1)
}

context.setFillColor(red: 1.0, green: 1.0, blue: 1.0, alpha: 1.0)
context.fill(CGRect(x: 0, y: 0, width: width, height: height))
context.draw(img, in: CGRect(x: 0, y: 0, width: width, height: height))

guard let flatImage = context.makeImage() else {
    print("failed to make flat image")
    exit(1)
}

let handler = VNImageRequestHandler(cgImage: flatImage, options: [:])
let req = VNRecognizeTextRequest { (r, err) in
    if let results = r.results as? [VNRecognizedTextObservation] {
        for obs in results {
            if let cand = obs.topCandidates(1).first {
                let box = obs.boundingBox
                print(String(format: "[%.3f, %.3f, %.3f, %.3f]: ", box.origin.x, box.origin.y, box.size.width, box.size.height) + cand.string)
            }
        }
    }
}
req.recognitionLevel = .accurate
req.usesLanguageCorrection = true

try? handler.perform([req])
