export default function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="container mx-auto px-6 py-4 text-center">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Data Structures & Algorithms Learning Platform.
          <span className="mx-2">•</span>
          Created with ❤️ by <span className="font-medium text-foreground">Praise Masunga (PraiseTech)</span>
        </p>
      </div>
    </footer>
  )
}
