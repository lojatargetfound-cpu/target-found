export default function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-black">
              TARGET FOUND
            </h2>

            <p className="text-gray-500 mt-2">
              Sneakers premium exclusivos.
            </p>
          </div>

          <div className="flex items-center gap-6 text-sm text-gray-500">
            <a
              href="#"
              className="hover:text-black transition"
            >
              Instagram
            </a>

            <a
              href="#"
              className="hover:text-black transition"
            >
              TikTok
            </a>

            <a
              href="#"
              className="hover:text-black transition"
            >
              Contato
            </a>
          </div>
        </div>

        <div className="border-t border-gray-100 mt-8 pt-6 text-sm text-gray-400 text-center">
          © 2026 TARGET FOUND — Todos os direitos reservados.
        </div>
      </div>
    </footer>
  )
}