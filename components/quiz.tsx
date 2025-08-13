"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { CheckCircle, XCircle, RotateCcw, Trophy, Brain } from "lucide-react"

interface QuizQuestion {
  question: string
  options: string[]
  correct: number
  explanation: string
}

interface QuizProps {
  questions: QuizQuestion[]
  onComplete?: (score: number) => void
}

export default function Quiz({ questions, onComplete }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string>("")
  const [answers, setAnswers] = useState<number[]>([])
  const [showResult, setShowResult] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)

  const handleAnswerSelect = (value: string) => {
    setSelectedAnswer(value)
  }

  const handleNextQuestion = () => {
    const answerIndex = Number.parseInt(selectedAnswer)
    const newAnswers = [...answers, answerIndex]
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer("")
      setShowResult(false)
      setShowExplanation(false)
    } else {
      // Quiz completed
      const correctAnswers = newAnswers.filter((answer, index) => answer === questions[index].correct).length
      const score = Math.round((correctAnswers / questions.length) * 100)
      setQuizCompleted(true)
      onComplete?.(score)
    }
  }

  const handleSubmitAnswer = () => {
    setShowResult(true)
    setShowExplanation(true)
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer("")
    setAnswers([])
    setShowResult(false)
    setQuizCompleted(false)
    setShowExplanation(false)
  }

  const calculateScore = () => {
    const correctAnswers = answers.filter((answer, index) => answer === questions[index].correct).length
    return Math.round((correctAnswers / questions.length) * 100)
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-600"
    if (score >= 60) return "text-orange-600"
    return "text-rose-600"
  }

  const getScoreBadgeVariant = (score: number) => {
    if (score >= 80) return "default"
    if (score >= 60) return "secondary"
    return "destructive"
  }

  if (quizCompleted) {
    const score = calculateScore()
    const correctAnswers = answers.filter((answer, index) => answer === questions[index].correct).length

    return (
      <Card className="modern-card">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-4 rounded-full bg-gradient-to-r from-violet-500 to-emerald-500 w-fit">
            <Trophy className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl text-gradient">Quiz Completed!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <div className={`text-4xl font-bold ${getScoreColor(score)}`}>{score}%</div>
            <div className="text-muted-foreground">
              You got {correctAnswers} out of {questions.length} questions correct
            </div>
            <Badge variant={getScoreBadgeVariant(score)} className="text-lg px-4 py-2">
              {score >= 80 ? "Excellent!" : score >= 60 ? "Good Job!" : "Keep Learning!"}
            </Badge>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Review Your Answers:</h3>
            {questions.map((question, index) => {
              const userAnswer = answers[index]
              const isCorrect = userAnswer === question.correct

              return (
                <div key={index} className="p-4 rounded-lg border border-border bg-muted/50">
                  <div className="flex items-start gap-3 mb-2">
                    {isCorrect ? (
                      <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5" />
                    ) : (
                      <XCircle className="h-5 w-5 text-rose-500 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <p className="font-medium mb-2">{question.question}</p>
                      <div className="space-y-1 text-sm">
                        <p className={isCorrect ? "text-emerald-600" : "text-rose-600"}>
                          Your answer: {question.options[userAnswer]}
                        </p>
                        {!isCorrect && (
                          <p className="text-emerald-600">Correct answer: {question.options[question.correct]}</p>
                        )}
                        <p className="text-muted-foreground mt-2">{question.explanation}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="flex justify-center">
            <Button onClick={resetQuiz} variant="outline" className="bg-transparent">
              <RotateCcw className="h-4 w-4 mr-2" />
              Retake Quiz
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  const question = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <Card className="modern-card">
      <CardHeader>
        <div className="flex items-center justify-between mb-4">
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-violet-600" />
            Question {currentQuestion + 1} of {questions.length}
          </CardTitle>
          <Badge variant="outline">{Math.round(progress)}% Complete</Badge>
        </div>
        <Progress value={progress} className="h-2" />
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">{question.question}</h3>

          <RadioGroup value={selectedAnswer} onValueChange={handleAnswerSelect}>
            {question.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                <Label
                  htmlFor={`option-${index}`}
                  className="flex-1 cursor-pointer p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                >
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {showExplanation && (
          <div className="p-4 rounded-lg bg-muted/50 border border-border">
            <div className="flex items-start gap-3">
              {Number.parseInt(selectedAnswer) === question.correct ? (
                <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5" />
              ) : (
                <XCircle className="h-5 w-5 text-rose-500 mt-0.5" />
              )}
              <div>
                <p className="font-medium mb-2">
                  {Number.parseInt(selectedAnswer) === question.correct ? "Correct!" : "Incorrect"}
                </p>
                <p className="text-sm text-muted-foreground">{question.explanation}</p>
                {Number.parseInt(selectedAnswer) !== question.correct && (
                  <p className="text-sm text-emerald-600 mt-2">
                    The correct answer is: {question.options[question.correct]}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between">
          <div className="text-sm text-muted-foreground">
            Progress: {currentQuestion + 1} / {questions.length}
          </div>

          {!showResult ? (
            <Button onClick={handleSubmitAnswer} disabled={!selectedAnswer} className="btn-gradient">
              Submit Answer
            </Button>
          ) : (
            <Button onClick={handleNextQuestion} className="btn-gradient">
              {currentQuestion < questions.length - 1 ? "Next Question" : "Complete Quiz"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
