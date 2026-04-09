import { motion } from "framer-motion";

export function LoadingScreen() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--pastel-page)] dark:bg-gray-950">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="text-center"
      >
        <div className="relative mb-6">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
            className="w-10 h-10 rounded-full border-2 border-[var(--pastel-border)] dark:border-gray-700 border-t-gray-800 dark:border-t-gray-200 mx-auto"
          />
        </div>
        <p className="text-sm text-gray-400 dark:text-gray-500 font-medium">Veriler yukleniyor</p>
      </motion.div>
    </div>
  );
}

export function ErrorScreen({ message }: { message: string }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--pastel-page)] dark:bg-gray-950 px-4 md:px-6">
      <div className="text-center max-w-md">
        <div className="w-12 h-12 rounded-full bg-red-50 dark:bg-red-950/50 flex items-center justify-center mx-auto mb-4">
          <span className="text-red-500 text-xl font-bold">!</span>
        </div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Veri Yuklenemedi
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">{message}</p>
      </div>
    </div>
  );
}
