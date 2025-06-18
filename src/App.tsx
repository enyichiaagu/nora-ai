import Header from '@/components/layout/Header';

export default function App() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="text-3xl text-center">React App</div>
      </main>
    </div>
  );
}