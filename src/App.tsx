import React, { useState, useEffect } from 'react';
import { PageType } from './types';
import { Header } from './components/Header';
import { StatutoryBanner } from './components/StatutoryBanner';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { ApplicationModal } from './components/ApplicationModal';

import { HomePage } from './pages/HomePage';
import { CashAdvancePage } from './pages/CashAdvancePage';
import { PromotionsPage } from './pages/PromotionsPage';
import { TUReportPage } from './pages/TUReportPage';
import { CompareCardsPage } from './pages/CompareCardsPage';
import { VisaPlatinumPage } from './pages/VisaPlatinumPage';
import { PropCardPage } from './pages/PropCardPage';
import { DiagnosticNoticeBar } from './components/DiagnosticNoticeBar';
import { GitHubPagesDiagnosticModal } from './components/GitHubPagesDiagnosticModal';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [modalCardType, setModalCardType] = useState<string>('platinum');
  const [isDiagnosticOpen, setIsDiagnosticOpen] = useState(false);

  // Handle URL hash changes on load or manual hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (['home', 'cash-advance', 'promotions', 'tu-report', 'compare', 'visa-platinum', 'prop-card'].includes(hash)) {
        setCurrentPage(hash as PageType);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: PageType, targetHash?: string) => {
    setCurrentPage(page);
    window.location.hash = page;

    if (targetHash) {
      setTimeout(() => {
        const el = document.getElementById(targetHash.replace('#', ''));
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenApplyModal = (cardType?: string) => {
    if (cardType) {
      setModalCardType(cardType === 'prop' ? 'prop' : 'platinum');
    }
    setIsApplyModalOpen(true);
  };

  const handleCloseApplyModal = () => {
    setIsApplyModalOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fdf8ff] text-[#161324] font-sans antialiased selection:bg-[#E83375] selection:text-white">
      {/* 0. Top Diagnostic Notice for GitHub Pages */}
      <DiagnosticNoticeBar onOpenDiagnostic={() => setIsDiagnosticOpen(true)} />

      {/* 1. Universal Top Header & Navigation (Aligned consistently across all pages) */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenApplyModal={handleOpenApplyModal}
      />

      {/* 2. Main Page Content View */}
      <main className="flex-1 w-full">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onOpenApplyModal={handleOpenApplyModal}
          />
        )}
        {currentPage === 'cash-advance' && (
          <CashAdvancePage
            onNavigate={handleNavigate}
            onOpenApplyModal={handleOpenApplyModal}
          />
        )}
        {currentPage === 'promotions' && (
          <PromotionsPage
            onNavigate={handleNavigate}
            onOpenApplyModal={handleOpenApplyModal}
          />
        )}
        {currentPage === 'tu-report' && (
          <TUReportPage
            onNavigate={handleNavigate}
            onOpenApplyModal={handleOpenApplyModal}
          />
        )}
        {currentPage === 'compare' && (
          <CompareCardsPage
            onNavigate={handleNavigate}
            onOpenApplyModal={handleOpenApplyModal}
          />
        )}
        {currentPage === 'visa-platinum' && (
          <VisaPlatinumPage
            onNavigate={handleNavigate}
            onOpenApplyModal={handleOpenApplyModal}
          />
        )}
        {currentPage === 'prop-card' && (
          <PropCardPage
            onNavigate={handleNavigate}
            onOpenApplyModal={handleOpenApplyModal}
          />
        )}
      </main>

      {/* 3. Universal Statutory Warning Banner (Mandatory Hong Kong Money Lenders Notice) */}
      <StatutoryBanner />

      {/* 4. Universal Corporate Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* 5. Floating Interactive WhatsApp Support Widget */}
      <WhatsAppButton />

      {/* 6. Universal Credit Card Application Modal */}
      <ApplicationModal
        isOpen={isApplyModalOpen}
        onClose={handleCloseApplyModal}
        defaultCard={modalCardType}
      />

      {/* 7. GitHub Pages Diagnostic Modal */}
      <GitHubPagesDiagnosticModal
        isOpen={isDiagnosticOpen}
        onClose={() => setIsDiagnosticOpen(false)}
      />
    </div>
  );
}
