import React, { useState, useEffect } from 'react';
import { I18nProvider } from './data/i18nContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeSwiper } from './components/HomeSwiper';
import { VehicleDetail } from './components/VehicleDetail';
import { SeriesOverview } from './components/SeriesOverview';
import { BrandPage } from './components/BrandPage';
import { TechnologyPage } from './components/TechnologyPage';
import { JetourLifePage } from './components/JetourLifePage';
import { OurJourneyPage } from './components/OurJourneyPage';
import { GlobalNetworkPage } from './components/GlobalNetworkPage';
import { ContactUsPage } from './components/ContactUsPage';
import { NewsPage } from './components/NewsPage';
import { MomentsPage } from './components/MomentsPage';
import { JetourFamilyPage } from './components/JetourFamilyPage';
import { JmaPage } from './components/JmaPage';
import { FaqsPage } from './components/FaqsPage';
import { LegalPage } from './components/LegalPage';
import { SearchModal } from './components/SearchModal';
import { TestDriveModal } from './components/TestDriveModal';
import { VEHICLES } from './data/vehicles';
import type { PageRoute, VehicleId, SeriesId } from './types';

export const App: React.FC = () => {
  // Read initial route from URL path or fallback to '/'
  const getInitialRoute = (): PageRoute => {
    const path = window.location.pathname as PageRoute;
    const validRoutes: PageRoute[] = [
      '/',
      '/g700',
      '/t2',
      '/t1',
      '/t1-i-dm',
      '/t2-i-dm',
      '/dashing',
      '/x70plus',
      '/x90plus',
      '/brand',
      '/technology',
      '/jetourlife',
      '/ourjourney',
      '/gSeries',
      '/tSeries',
      '/jmkSeries',
      '/familySeries',
      '/globalnetwork',
      '/contactus',
      '/news',
      '/moments',
      '/jetourfamily',
      '/jma',
      '/faqs',
      '/privacypolicy',
      '/cookie',
    ];
    return validRoutes.includes(path) ? path : '/';
  };

  const [currentRoute, setCurrentRoute] = useState<PageRoute>(getInitialRoute);
  const [searchOpen, setSearchOpen] = useState(false);
  const [testDriveOpen, setTestDriveOpen] = useState(false);
  const [testDriveVehicleId, setTestDriveVehicleId] = useState<VehicleId | undefined>(undefined);

  // Sync with browser URL & history
  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(getInitialRoute());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (route: PageRoute) => {
    if (route === currentRoute) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    window.history.pushState({}, '', route);
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openTestDrive = (vehicleId?: VehicleId) => {
    setTestDriveVehicleId(vehicleId);
    setTestDriveOpen(true);
  };

  // Check if current route matches a vehicle id
  const vehicleMatch = VEHICLES.find((v) => `/${v.id}` === currentRoute);

  // Check if current route matches a series
  const seriesMap: Record<string, SeriesId> = {
    '/gSeries': 'gSeries',
    '/tSeries': 'tSeries',
    '/jmkSeries': 'jmkSeries',
    '/familySeries': 'familySeries',
  };
  const seriesMatch = seriesMap[currentRoute];

  return (
    <I18nProvider>
      <div id="jetour-app-root" className="min-h-screen bg-[#101112] text-white flex flex-col selection:bg-[#39AEB2] selection:text-black">
        {/* Persistent Global Header */}
        <Header
          currentRoute={currentRoute}
          onNavigate={navigate}
          onOpenSearch={() => setSearchOpen(true)}
          onOpenTestDrive={openTestDrive}
        />

        {/* Dynamic Route Content */}
        <main className="flex-1">
          {currentRoute === '/' && (
            <HomeSwiper
              onNavigate={navigate}
              onOpenTestDrive={openTestDrive}
            />
          )}

          {vehicleMatch && (
            <>
              <VehicleDetail
                vehicle={vehicleMatch}
                onNavigate={navigate}
                onOpenTestDrive={openTestDrive}
              />
              <Footer onNavigate={navigate} />
            </>
          )}

          {seriesMatch && (
            <>
              <SeriesOverview
                series={seriesMatch}
                onNavigate={navigate}
                onOpenTestDrive={openTestDrive}
              />
              <Footer onNavigate={navigate} />
            </>
          )}

          {currentRoute === '/brand' && (
            <>
              <BrandPage onNavigate={navigate} />
              <Footer onNavigate={navigate} />
            </>
          )}

          {currentRoute === '/technology' && (
            <>
              <TechnologyPage onNavigate={navigate} />
              <Footer onNavigate={navigate} />
            </>
          )}

          {currentRoute === '/jetourlife' && (
            <>
              <JetourLifePage onNavigate={navigate} />
              <Footer onNavigate={navigate} />
            </>
          )}

          {currentRoute === '/ourjourney' && (
            <>
              <OurJourneyPage onNavigate={navigate} />
              <Footer onNavigate={navigate} />
            </>
          )}

          {currentRoute === '/globalnetwork' && (
            <>
              <GlobalNetworkPage
                onNavigate={navigate}
                onOpenTestDrive={openTestDrive}
              />
              <Footer onNavigate={navigate} />
            </>
          )}

          {currentRoute === '/contactus' && (
            <>
              <ContactUsPage onNavigate={navigate} />
              <Footer onNavigate={navigate} />
            </>
          )}

          {currentRoute === '/news' && (
            <>
              <NewsPage onNavigate={navigate} />
              <Footer onNavigate={navigate} />
            </>
          )}

          {currentRoute === '/moments' && (
            <>
              <MomentsPage onNavigate={navigate} />
              <Footer onNavigate={navigate} />
            </>
          )}

          {currentRoute === '/jetourfamily' && (
            <>
              <JetourFamilyPage
                onNavigate={navigate}
                onOpenTestDrive={openTestDrive}
              />
              <Footer onNavigate={navigate} />
            </>
          )}

          {currentRoute === '/jma' && (
            <>
              <JmaPage onNavigate={navigate} />
              <Footer onNavigate={navigate} />
            </>
          )}

          {currentRoute === '/faqs' && (
            <>
              <FaqsPage onNavigate={navigate} />
              <Footer onNavigate={navigate} />
            </>
          )}

          {currentRoute === '/privacypolicy' && (
            <>
              <LegalPage type="privacy" onNavigate={navigate} />
              <Footer onNavigate={navigate} />
            </>
          )}

          {currentRoute === '/cookie' && (
            <>
              <LegalPage type="cookie" onNavigate={navigate} />
              <Footer onNavigate={navigate} />
            </>
          )}
        </main>

        {/* Global Modals */}
        <SearchModal
          isOpen={searchOpen}
          onClose={() => setSearchOpen(false)}
          onNavigate={navigate}
        />

        <TestDriveModal
          isOpen={testDriveOpen}
          onClose={() => setTestDriveOpen(false)}
          initialVehicleId={testDriveVehicleId}
        />
      </div>
    </I18nProvider>
  );
};

export default App;
