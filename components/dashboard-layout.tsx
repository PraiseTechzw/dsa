"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ChevronLeft, ChevronRight, LayoutDashboard, Database, GitBranch, Search, SortAsc, Network, Workflow, TreePine, Route, Zap, BarChart3, BookOpen, Bot, Sparkles, Brain, Lightbulb, Target, TrendingUp } from 'lucide-react'
import Header from "@/components/header"
import Footer from "@/components/footer"
import AICodeHelper from "@/components/ai-code-helper"

const sidebarItems = [
  { icon: LayoutDashboard, title: "Introduction", href: "/introduction", color: "from-violet-500 to-purple-600" },
  { icon: Database, title: "Data Structures", href: "/data-structures", color: "from-blue-500 to-cyan-600" },
  { icon: GitBranch, title: "Algorithms", href: "/algorithms", color: "from-emerald-500 to-teal-600" },
  { icon: TreePine, title: "Trees", href: "/trees", color: "from-green-500 to-emerald-600" },
  { icon: Search, title: "Searching", href: "/searching", color: "from-orange-500 to-amber-600" },
  { icon: SortAsc, title: "Sorting", href: "/sorting", color: "from-red-500 to-rose-600" },
  { icon: Network, title: "Graphs", href: "/graphs", color: "from-indigo-500 to-blue-600" },
  { icon: Route, title: "Dijkstra's", href: "/dijkstras", color: "from-purple-500 to-violet-600" },
  { icon: Zap, title: "Kruskal's", href: "/kruskals", color: "from-yellow-500 to-orange-600" },
  { icon: BookOpen, title: "Prim's", href: "/prims", color: "from-pink-500 to-rose-600" },
  { icon: BarChart3, title: "Complexity Analysis", href: "/complexity-analysis", color: "from-teal-500 to-cyan-600" },
  { icon: Workflow, title: "Advanced Algorithms", href: "/advanced-algorithms", color: "from-slate-500 to-gray-600" },
]

const aiFeatures = [
  { icon: Brain, title: "Smart Analysis", description: "AI-powered code analysis" },
  { icon: Lightbulb, title: "Suggestions", description: "Intelligent recommendations" },
  { icon: Target, title: "Optimization", description: "Performance improvements" },
  { icon: TrendingUp, title: "Learning Path", description: "Personalized guidance" },
]

export default function DashboardLayout({ children }: { children: any }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [aiHelperOpen, setAiHelperOpen] = useState(false)
  const [activeFeature, setActiveFeature] = useState(0)
  const pathname = usePathname()

  // Auto-cycle through AI features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % aiFeatures.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  // Get current topic from pathname
  const getCurrentTopic = () => {
    const currentItem = sidebarItems.find((item) => item.href === pathname)
    return currentItem?.title || "Data Structures & Algorithms"
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Enhanced Sidebar */}
      <motion.aside
        className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-r border-white/20 dark:border-slate-700/50 fixed h-full overflow-hidden transition-all duration-500 ease-in-out z-40 shadow-2xl"
        animate={{ width: sidebarOpen ? (aiHelperOpen ? 800 : 320) : 80 }}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10 dark:border-slate-700/50 bg-gradient-to-r from-violet-500/10 via-sky-500/10 to-emerald-500/10">
          <motion.div
            className="flex items-center gap-3"
            animate={{ opacity: sidebarOpen ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {sidebarOpen && (
              <>
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                    <Database className="h-5 w-5 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                    <Sparkles className="h-2 w-2 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-lg font-bold bg-gradient-to-r from-violet-600 via-sky-600 to-emerald-600 bg-clip-text text-transparent">
                    DSA Master
                  </h1>
                  <p className="text-xs text-muted-foreground">AI-Powered Learning</p>
                </div>
              </>
            )}
          </motion.div>

          <div className="flex items-center gap-2">
            {sidebarOpen && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setAiHelperOpen(!aiHelperOpen)}
                className={`h-8 w-8 rounded-lg transition-all duration-300 ${
                  aiHelperOpen
                    ? "bg-gradient-to-r from-violet-500 to-emerald-500 text-white shadow-lg"
                    : "hover:bg-violet-100 dark:hover:bg-violet-900/20"
                }`}
              >
                <Bot className="h-4 w-4" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
              className="h-8 w-8 rounded-lg hover:bg-violet-100 dark:hover:bg-violet-900/20 transition-all duration-300"
            >
              {sidebarOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        <div className="flex h-[calc(100vh-5rem)]">
          {/* Navigation Section */}
          <div className={`${aiHelperOpen && sidebarOpen ? "w-80" : "flex-1"} transition-all duration-500`}>
            {/* AI Features Showcase */}
            {sidebarOpen && (
              <motion.div
                className="p-4 border-b border-white/10 dark:border-slate-700/50"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-gradient-to-r from-violet-500/10 to-emerald-500/10 rounded-xl p-3 border border-violet-200/50 dark:border-violet-700/50">
                  <div className="flex items-center gap-2 mb-2">
                    {aiFeatures[activeFeature].icon({ className: "h-4 w-4 text-violet-600" })}
                    <span className="text-sm font-medium text-violet-700 dark:text-violet-300">
                      {aiFeatures[activeFeature].title}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{aiFeatures[activeFeature].description}</p>
                  <div className="flex gap-1 mt-2">
                    {aiFeatures.map((_, index) => (
                      <div
                        key={index}
                        className={`h-1 rounded-full transition-all duration-300 ${
                          index === activeFeature
                            ? "w-4 bg-gradient-to-r from-violet-500 to-emerald-500"
                            : "w-1 bg-slate-300 dark:bg-slate-600"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Navigation Menu */}
            <ScrollArea className="flex-1">
              <nav className="space-y-2 p-3">
                {sidebarItems.map((item, index) => {
                  const isActive = pathname === item.href
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <Link href={item.href}>
                        <Button
                          variant={isActive ? "default" : "ghost"}
                          className={`w-full justify-start h-12 transition-all duration-300 group relative overflow-hidden ${
                            !sidebarOpen && "px-3"
                          } ${
                            isActive
                              ? `bg-gradient-to-r ${item.color} text-white shadow-lg hover:shadow-xl`
                              : "hover:bg-white/50 dark:hover:bg-slate-800/50 hover:text-violet-700 dark:hover:text-violet-300"
                          }`}
                          title={!sidebarOpen ? item.title : undefined}
                        >
                          {/* Background animation */}
                          {!isActive && (
                            <div
                              className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                            />
                          )}

                          <div
                            className={`relative z-10 flex items-center ${sidebarOpen ? "gap-3" : "justify-center"}`}
                          >
                            <item.icon
                              className={`h-5 w-5 shrink-0 ${isActive ? "text-white" : "text-violet-600"} transition-transform duration-300 group-hover:scale-110`}
                            />
                            <AnimatePresence>
                              {sidebarOpen && (
                                <motion.span
                                  className="font-medium truncate"
                                  initial={{ opacity: 0, width: 0 }}
                                  animate={{ opacity: 1, width: "auto" }}
                                  exit={{ opacity: 0, width: 0 }}
                                  transition={{ duration: 0.3 }}
                                >
                                  {item.title}
                                </motion.span>
                              )}
                            </AnimatePresence>
                          </div>

                          {/* Active indicator */}
                          {isActive && (
                            <motion.div
                              className="absolute right-2 w-2 h-2 bg-white rounded-full"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ duration: 0.3 }}
                            />
                          )}
                        </Button>
                      </Link>
                    </motion.div>
                  )
                })}
              </nav>
            </ScrollArea>

            {/* Quick Stats */}
            {sidebarOpen && (
              <motion.div
                className="p-4 border-t border-white/10 dark:border-slate-700/50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-gradient-to-br from-violet-500/10 to-purple-500/10 rounded-lg p-2 border border-violet-200/50 dark:border-violet-700/50">
                    <div className="text-xs text-muted-foreground">Progress</div>
                    <div className="text-sm font-bold text-violet-600">75%</div>
                  </div>
                  <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-lg p-2 border border-emerald-200/50 dark:border-emerald-700/50">
                    <div className="text-xs text-muted-foreground">Streak</div>
                    <div className="text-sm font-bold text-emerald-600">12 days</div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* AI Helper Panel */}
          <AnimatePresence>
            {aiHelperOpen && sidebarOpen && (
              <motion.div
                className="w-96 border-l border-white/10 dark:border-slate-700/50 bg-gradient-to-b from-violet-50/50 to-sky-50/50 dark:from-violet-900/20 dark:to-sky-900/20"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.5, type: "spring", damping: 25 }}
              >
                <div className="h-full flex flex-col">
                  {/* AI Helper Header */}
                  <div className="p-4 border-b border-white/10 dark:border-slate-700/50">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-lg bg-gradient-to-r from-violet-500 to-emerald-500">
                          <Bot className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-sm">AI Assistant</h3>
                          <p className="text-xs text-muted-foreground">Ready to help</p>
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      >
                        Online
                      </Badge>
                    </div>
                    <Separator className="my-2" />
                    <div className="text-xs text-muted-foreground">
                      Current Topic: <span className="font-medium text-violet-600">{getCurrentTopic()}</span>
                    </div>
                  </div>

                  {/* AI Helper Content */}
                  <div className="flex-1 overflow-hidden">
                    <AICodeHelper topic={getCurrentTopic()} initialCode="" language="python" />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.aside>

      {/* Main content */}
      <div
        className={`flex-1 flex flex-col transition-all duration-500 ease-in-out ${
          sidebarOpen ? (aiHelperOpen ? "ml-[800px]" : "ml-80") : "ml-20"
        }`}
      >
        <Header />
        <main className="flex-1 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-full"
          >
            {children}
          </motion.div>
        </main>
        <Footer />
      </div>

      {/* AI Helper Toggle Button (when sidebar is closed) */}
      <AnimatePresence>
        {!sidebarOpen && (
          <motion.div
            className="fixed bottom-6 left-6 z-50"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Button
              onClick={() => {
                setSidebarOpen(true)
                setAiHelperOpen(true)
              }}
              className="h-14 w-14 rounded-full bg-gradient-to-r from-violet-500 to-emerald-500 hover:from-violet-600 hover:to-emerald-600 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 group"
            >
              <Bot className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
