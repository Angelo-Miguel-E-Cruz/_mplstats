import Records from "./components/pages/records"
import Match from "./components/pages/match"
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-card to-background p-4">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Match />} />
          <Route path="/records/:id" element={<Records />} />
        </Routes>
      </BrowserRouter>
    </main>
  )
}

export default App
