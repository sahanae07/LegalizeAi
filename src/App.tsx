/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { LegalAnalysis } from './pages/LegalAnalysis';
import { IngredientSafety } from './pages/IngredientSafety';
import { About } from './pages/About';
import { Help } from './pages/Help';
import { Privacy } from './pages/Privacy';

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/legal" element={<LegalAnalysis />} />
          <Route path="/ingredients" element={<IngredientSafety />} />
          <Route path="/about" element={<About />} />
          <Route path="/help" element={<Help />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
      </Layout>
    </Router>
  );
}

