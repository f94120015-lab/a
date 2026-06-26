const fs = require('fs');
const path = require('path');

// Mock browser globals that data.js expects or references
global.window = {};
global.document = {
  documentElement: {
    style: {
      setProperty: () => {}
    }
  }
};

// Read data.js content
const dataJsPath = path.join(__dirname, '../data.js');
let dataContent = fs.readFileSync(dataJsPath, 'utf8');

// Append global exporter so we can retrieve const variables
dataContent += "\nglobal.lessons = lessons;\nglobal.units = units;";

// Evaluate data.js
eval(dataContent);

console.log("data.js successfully loaded in mock node environment.");

// Find lessons for Unit 11
const unit11Lessons = global.lessons.filter(l => l.unitId === 11);
console.log(`Unit 11 has ${unit11Lessons.length} lessons.`);

let totalQuestionsCount = 0;
const questionIds = new Set();
const questionDetails = [];

// Helper to check for deep equality
function isDeepEqual(obj1, obj2) {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

unit11Lessons.forEach(lesson => {
  console.log(`\nLesson ID ${lesson.id}: "${lesson.subtitle}"`);
  if (!lesson.exercises || lesson.exercises.length === 0) {
    console.log("  No exercises found for this lesson.");
    return;
  }
  
  lesson.exercises.forEach(exercise => {
    console.log(`  Exercise ID ${exercise.id}: "${exercise.title}" - ${exercise.questions.length} questions`);
    exercise.questions.forEach((q, idx) => {
      totalQuestionsCount++;
      
      // Check for duplicate ID
      if (questionIds.has(q.id)) {
        console.log(`    ⚠️ DUPLICATE QUESTION ID FOUND: "${q.id}"`);
      } else {
        questionIds.add(q.id);
      }
      
      // Store details to check for semantic duplication
      const detail = {
        lessonId: lesson.id,
        exerciseId: exercise.id,
        questionIndex: idx,
        id: q.id,
        type: q.type,
        prompt: q.prompt,
        enSentence: q.enSentence,
        pairs: q.pairs,
        options: q.options,
        correctIndex: q.correctIndex,
        correctSentence: q.correctSentence,
        translation: q.translation,
        correctOrder: q.correctOrder
      };
      
      // Compare with previous questions
      questionDetails.forEach(prev => {
        // Match base English sentences or prompts
        const isSameEnSentence = q.enSentence && prev.enSentence && q.enSentence === prev.enSentence;
        const isSamePrompt = q.prompt && prev.prompt && q.prompt === prev.prompt;
        const isSameType = q.type === prev.type;
        
        if (isSameEnSentence && isSamePrompt && isSameType) {
          // If it's the exact same question structure and sentence in the same lesson
          if (lesson.id === prev.lessonId) {
            console.log(`    ⚠️ DUPLICATE QUESTION CONTENT IN SAME LESSON (Lesson ${lesson.id}):`);
            console.log(`      Current: idx ${idx}, id: ${q.id}, en: "${q.enSentence || q.prompt}"`);
            console.log(`      Previous: idx ${prev.questionIndex}, id: ${prev.id}`);
          }
        }
        
        // Also check matching pairs duplication within the same matching question
        if (q.type === 'matching' && prev.type === 'matching' && q.id === prev.id) {
          // Same question id, check if pairs are exactly identical
          if (isDeepEqual(q.pairs, prev.pairs)) {
            console.log(`    ⚠️ IDENTICAL MATCHING PAIRS IN QUESTION ${q.id}`);
          }
        }
      });
      
      questionDetails.push(detail);
    });
  });
});

console.log(`\nTotal Unit 11 questions checked: ${totalQuestionsCount}`);
console.log(`Total unique question IDs: ${questionIds.size}`);
