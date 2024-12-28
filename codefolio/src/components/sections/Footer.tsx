export const Footer = () => {
    return (
      <footer className="w-full py-6 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} Aaris Khan. All rights reserved.
          </p>
        </div>
      </footer>
    )
  }