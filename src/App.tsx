import Header from '@/components/layout/Header';
import Playground from '@/components/playground';

export default function App() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="text-3xl text-center mb-8">React App</div>
        <Playground />
      </main>
    </div>
  );
}