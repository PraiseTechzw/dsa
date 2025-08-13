import Link from "next/link"
import { Github, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeSwitcher } from "@/components/theme-provider"

export default function Header() {
  return (
    <header className="bg-card border-b border-border sticky top-0 z-30">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/introduction" className="text-xl font-bold text-foreground hover:text-primary transition-colors">
          Data Structures & Algorithms
        </Link>
        <nav className="flex items-center space-x-4">
          <ThemeSwitcher />
          <Button variant="outline" size="sm" asChild>
            <a
              href="https://github.com/your-github-username/data-structures-algorithms"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Github className="h-4 w-4" />
              <span className="hidden sm:inline">GitHub</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </Button>
        </nav>
      </div>
    </header>
  )
}
