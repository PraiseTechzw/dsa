"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  ArrowRight,
  BookOpen,
  Code,
  FileText,
  Lightbulb,
  Target,
  Zap,
  Database,
  GitBranch,
  BarChart3,
  Users,
  Award,
  Clock,
} from "lucide-react"
import Link from "next/link"

const courseOutline = [
  {
    title: "Data Structures Fundamentals",
    href: "/data-structures",
    icon: Database,
    description: "Arrays, Linked Lists, Stacks, Queues",
    progress: 0,
    color: "emerald",
  },
  {
    title: "Algorithm Basics and Analysis",
    href: "/algorithms",
    icon: GitBranch,
    description: "Complexity, Sorting, Searching",
    progress: 0,
    color: "violet",
  },
  {
    title: "Trees and Graph Structures",
    href: "/trees",
    icon: FileText,
    description: "Binary Trees, BST, Graph Traversal",
    progress: 0,
    color: "sky",
  },
  {
    title: "Advanced Algorithms",
    href: "/advanced-algorithms",
    icon: Zap,
    description: "Dynamic Programming, Greedy Algorithms",
    progress: 0,
    color: "orange",
  },
  {
    title: "Complexity Analysis",
    href: "/complexity-analysis",
    icon: BarChart3,
    description: "Big O, Time & Space Complexity",
    progress: 0,
    color: "rose",
  },
]

const learningObjectives = [
  {
    icon: Target,
    title: "Master Core Concepts",
    description: "Understand fundamental data structures and their applications in real-world scenarios",
  },
  {
    icon: BarChart3,
    title: "Analyze Efficiency",
    description: "Learn to analyze algorithm efficiency using Big O notation and complexity analysis",
  },
  {
    icon: Code,
    title: "Implement Solutions",
    description: "Build and optimize various algorithms with hands-on coding practice",
  },
  {
    icon: Lightbulb,
    title: "Problem Solving",
    description: "Develop critical thinking and problem-solving skills for technical challenges",
  },
  {
    icon: Award,
    title: "Interview Ready",
    description: "Prepare for technical interviews with comprehensive algorithm knowledge",
  },
  {
    icon: Users,
    title: "Real Applications",
    description: "Apply concepts to solve complex problems in software development",
  },
]

const features = [
  {
    icon: Code,
    title: "Interactive Coding",
    description: "Practice with hands-on coding challenges and receive instant feedback",
  },
  {
    icon: FileText,
    title: "Comprehensive Resources",
    description: "Access detailed explanations, examples, and additional learning materials",
  },
  {
    icon: BarChart3,
    title: "Visual Learning",
    description: "Understand algorithms through interactive visualizations and animations",
  },
  {
    icon: Clock,
    title: "Self-Paced",
    description: "Learn at your own pace with flexible scheduling and progress tracking",
  },
]

export default function IntroductionPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen gradient-bg">
      <div className="container mx-auto px-4 py-8 space-y-12">
        {/* Hero Section */}
        <motion.div
          className="text-center space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="space-y-4">
            <Badge
              variant="secondary"
              className="bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300 px-4 py-2"
            >
              🚀 Master Computer Science Fundamentals
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-gradient leading-tight">
              Data Structures &<br />
              Algorithms Mastery
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Embark on a comprehensive journey through the fundamental building blocks of computer science. Master
              algorithms, understand data structures, and develop the problem-solving skills that power modern
              technology.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Link href="/data-structures">
              <Button
                size="lg"
                className="bg-gradient-to-r from-violet-500 to-sky-500 hover:from-violet-600 hover:to-sky-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Start Learning Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/complexity-analysis">
              <Button
                variant="outline"
                size="lg"
                className="border-violet-200 hover:bg-violet-50 dark:border-violet-800 dark:hover:bg-violet-900/20 bg-transparent"
              >
                Explore Concepts
                <BookOpen className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {[
            { label: "Topics Covered", value: "50+", icon: BookOpen },
            { label: "Interactive Examples", value: "100+", icon: Code },
            { label: "Practice Problems", value: "200+", icon: Target },
            { label: "Visualizations", value: "30+", icon: BarChart3 },
          ].map((stat, index) => (
            <Card key={index} className="modern-card text-center">
              <CardContent className="p-6">
                <stat.icon className="h-8 w-8 text-violet-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gradient">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 lg:w-fit lg:mx-auto">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="objectives" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Objectives
            </TabsTrigger>
            <TabsTrigger value="outline" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Course Outline
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <Card className="modern-card">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Why Learn Data Structures and Algorithms?</CardTitle>
                <CardDescription className="text-lg">
                  The foundation of efficient software development and problem-solving
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {[
                    {
                      icon: Zap,
                      title: "Performance Optimization",
                      description:
                        "Learn to write efficient code that scales with large datasets and complex operations.",
                    },
                    {
                      icon: Award,
                      title: "Technical Interviews",
                      description: "Master the algorithms and data structures commonly asked in technical interviews.",
                    },
                    {
                      icon: Code,
                      title: "Problem Solving",
                      description: "Develop systematic approaches to breaking down and solving complex problems.",
                    },
                    {
                      icon: BarChart3,
                      title: "System Design",
                      description: "Understand the building blocks needed for designing scalable software systems.",
                    },
                    {
                      icon: Users,
                      title: "Industry Standards",
                      description: "Learn the fundamental concepts that every software engineer should know.",
                    },
                    {
                      icon: Lightbulb,
                      title: "Critical Thinking",
                      description:
                        "Enhance your analytical and logical thinking skills through algorithmic challenges.",
                    },
                  ].map((benefit, index) => (
                    <motion.div
                      key={index}
                      className="space-y-3 p-4 rounded-lg bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900/50 dark:to-gray-800/50 border border-gray-200/50 dark:border-gray-700/50"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <benefit.icon className="h-8 w-8 text-violet-600" />
                      <h3 className="font-semibold text-lg">{benefit.title}</h3>
                      <p className="text-muted-foreground text-sm">{benefit.description}</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
              {features.map((feature, index) => (
                <Card key={index} className="interactive-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <div className="p-2 bg-violet-100 dark:bg-violet-900/30 rounded-lg">
                        <feature.icon className="h-5 w-5 text-violet-600" />
                      </div>
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="objectives" className="space-y-6">
            <Card className="modern-card">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Learning Objectives</CardTitle>
                <CardDescription>What you'll achieve by the end of this course</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  {learningObjectives.map((objective, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start gap-4 p-4 rounded-lg bg-gradient-to-r from-violet-50/50 to-sky-50/50 dark:from-violet-950/20 dark:to-sky-950/20 border border-violet-200/30 dark:border-violet-800/30"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className="p-2 bg-gradient-to-br from-violet-500 to-sky-500 rounded-lg text-white">
                        <objective.icon className="h-5 w-5" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-semibold text-lg">{objective.title}</h3>
                        <p className="text-muted-foreground">{objective.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="outline" className="space-y-6">
            <Card className="modern-card">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Course Roadmap</CardTitle>
                <CardDescription>A structured path through data structures and algorithms</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {courseOutline.map((item, index) => (
                    <motion.div
                      key={index}
                      className="group"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card className="interactive-card group-hover:shadow-xl transition-all duration-300">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 flex-1">
                              <div className={`p-3 bg-${item.color}-100 dark:bg-${item.color}-900/30 rounded-lg`}>
                                <item.icon className={`h-6 w-6 text-${item.color}-600`} />
                              </div>
                              <div className="space-y-1 flex-1">
                                <h3 className="font-semibold text-lg">{item.title}</h3>
                                <p className="text-muted-foreground text-sm">{item.description}</p>
                                <div className="flex items-center gap-2 mt-2">
                                  <Progress value={item.progress} className="flex-1 h-2" />
                                  <span className="text-xs text-muted-foreground">{item.progress}%</span>
                                </div>
                              </div>
                            </div>
                            <Link href={item.href}>
                              <Button
                                variant="outline"
                                className="group-hover:bg-violet-50 dark:group-hover:bg-violet-900/20 bg-transparent"
                              >
                                Start
                                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                              </Button>
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Call to Action */}
        <motion.div
          className="text-center space-y-6 py-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-gradient">Ready to Begin Your Journey?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join thousands of developers who have mastered data structures and algorithms. Start with the fundamentals
              and build your way up to advanced concepts.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/data-structures">
              <Button
                size="lg"
                className="bg-gradient-to-r from-violet-500 to-sky-500 hover:from-violet-600 hover:to-sky-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-8"
              >
                Start with Data Structures
                <Database className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/algorithms">
              <Button
                variant="outline"
                size="lg"
                className="border-violet-200 hover:bg-violet-50 dark:border-violet-800 dark:hover:bg-violet-900/20 px-8 bg-transparent"
              >
                Explore Algorithms
                <GitBranch className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
