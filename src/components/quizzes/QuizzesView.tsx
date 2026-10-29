import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  XCircle,
} from 'lucide-react';
import { SkillQuiz } from '../../types';

export const QuizzesView: React.FC = () => {
  const { quizzes, submitQuizScore, setActiveTab } = useApp();

  const [activeQuiz, setActiveQuiz] = useState<SkillQuiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleStartQuiz = (quiz: SkillQuiz) => {
    setActiveQuiz(quiz);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setIsSubmitted(false);
  };

  const handleSelectOption = (optionIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: optionIndex
    }));
  };

  const handleFinishQuiz = () => {
    if (!activeQuiz) return;
    setIsSubmitted(true);

    let score = 0;
    activeQuiz.questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswer) {
        score++;
      }
    });

    submitQuizScore(activeQuiz.id, score, activeQuiz.questions.length);
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-150">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Skill Validation Quizzes
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Explore {quizzes.length} quick checks across your technical skills. Pass to validate your skill level.
          </p>
        </div>
      </div>

      {!activeQuiz ? (
        /* Quiz Catalog */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {quizzes.map(quiz => (
            <div
              key={quiz.id}
              className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between hover:shadow-md transition"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-full">
                    {quiz.category}
                  </span>
                  <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>~{quiz.timeMinutes} mins</span>
                  </span>
                </div>

                <h3 className="text-lg font-black text-slate-900 mb-1">
                  {quiz.skillName} Mastery Quiz
                </h3>
                <p className="text-xs text-slate-500 mb-4">
                  {quiz.questionsCount} scenario questions assessing Level {quiz.level} competence.
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-600 font-medium">Passing: 75% score</span>
                <button
                  onClick={() => handleStartQuiz(quiz)}
                  className="px-4 py-2 rounded-xl bg-[#1d4ed8] text-white text-xs font-bold hover:bg-blue-700 transition flex items-center gap-1 shadow-xs"
                >
                  <span>Start Quiz</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Interactive Quiz Modal / View */
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm max-w-2xl mx-auto space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <span className="text-[11px] font-bold uppercase text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-md">
                {activeQuiz.skillName} • Level {activeQuiz.level}
              </span>
              <h3 className="font-extrabold text-slate-900 text-base mt-1">
                Question {currentQuestionIndex + 1} of {activeQuiz.questions.length}
              </h3>
            </div>
            <button
              onClick={() => setActiveQuiz(null)}
              className="text-xs font-bold text-slate-500 hover:text-slate-800 px-3 py-1.5 rounded-xl border border-slate-200"
            >
              Exit Quiz
            </button>
          </div>

          {/* Current Question */}
          <div className="space-y-4">
            <p className="text-sm font-bold text-slate-900 leading-relaxed">
              {activeQuiz.questions[currentQuestionIndex].question}
            </p>

            {/* Options */}
            <div className="space-y-2.5">
              {activeQuiz.questions[currentQuestionIndex].options.map((opt, optIdx) => {
                const isSelected = selectedAnswers[currentQuestionIndex] === optIdx;
                const isCorrect = activeQuiz.questions[currentQuestionIndex].correctAnswer === optIdx;

                let btnStyle = 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700';
                if (isSelected && !isSubmitted) {
                  btnStyle = 'border-[#1d4ed8] bg-blue-50/50 text-[#1d4ed8] ring-1 ring-[#1d4ed8]';
                } else if (isSubmitted) {
                  if (isCorrect) {
                    btnStyle = 'border-teal-500 bg-teal-50 text-teal-900 font-bold';
                  } else if (isSelected && !isCorrect) {
                    btnStyle = 'border-rose-400 bg-rose-50 text-rose-800';
                  }
                }

                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectOption(optIdx)}
                    className={`w-full text-left p-3.5 rounded-2xl border text-xs sm:text-sm font-medium transition flex items-center justify-between ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {isSubmitted && isCorrect && <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />}
                    {isSubmitted && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-rose-500 shrink-0" />}
                  </button>
                );
              })}
            </div>

            {/* Explanation when submitted */}
            {isSubmitted && (
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1">
                <span className="font-bold text-slate-900 block">Explanation:</span>
                <p>{activeQuiz.questions[currentQuestionIndex].explanation}</p>
              </div>
            )}
          </div>

          {/* Navigation Controls */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
              disabled={currentQuestionIndex === 0}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 border border-slate-200 disabled:opacity-40"
            >
              Previous
            </button>

            {currentQuestionIndex < activeQuiz.questions.length - 1 ? (
              <button
                onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                className="px-5 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800"
              >
                Next Question
              </button>
            ) : !isSubmitted ? (
              <button
                onClick={handleFinishQuiz}
                className="px-5 py-2 rounded-xl bg-[#00875a] text-white text-xs font-bold hover:bg-emerald-700 shadow-xs"
              >
                Submit Answers
              </button>
            ) : (
              <button
                onClick={() => {
                  setActiveQuiz(null);
                  setActiveTab('profile');
                }}
                className="px-5 py-2 rounded-xl bg-[#1d4ed8] text-white text-xs font-bold hover:bg-blue-700 shadow-xs"
              >
                View Updated Skills
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
