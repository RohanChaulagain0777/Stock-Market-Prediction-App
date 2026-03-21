"use client";

import Navbar from '../components/Navbar';
import TradingView from '@/components/ui/TradingView';
import HeatMap from '@/components/ui/HeatMap';
import News from "@/components/ui/News";
import React, { useEffect, useState } from 'react';

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
};

const Dashboard = () => {
  const isMobile = useIsMobile();

  return (
    <div style={styles.root}>
      <style>{`
        @media (max-width: 767px) {
          .dashboard-row {
            flex-direction: column !important;
          }
          .dashboard-panel {
            flex: 1 1 100% !important;
            width: 100% !important;
          }
          .dashboard-card-tall {
            height: 340px !important;
          }
          .dashboard-card-short {
            height: 320px !important;
          }
          .dashboard-main {
            padding: 16px 12px 32px !important;
            gap: 16px !important;
          }
          .dashboard-row {
            gap: 16px !important;
          }
        }
        @media (min-width: 768px) and (max-width: 1024px) {
          .dashboard-card-tall {
            height: 400px !important;
          }
          .dashboard-card-short {
            height: 360px !important;
          }
          .dashboard-main {
            padding: 20px 16px 40px !important;
          }
        }
      `}</style>

      <Navbar />

      <main style={styles.main} className="dashboard-main">

        <div style={styles.row} className="dashboard-row">
          <section style={styles.panel} className="dashboard-panel">
            <h2 style={styles.sectionTitle}>Market Overview</h2>
            <div style={{ ...styles.card, height: 520 }} className="dashboard-card-tall">
              <TradingView />
            </div>
          </section>

          <section style={{ ...styles.panel, flex: 2 }} className="dashboard-panel">
            <h2 style={styles.sectionTitle}>Stock Heatmap</h2>
            <div style={{ ...styles.card, height: 520 }} className="dashboard-card-tall">
              <HeatMap />
            </div>
          </section>
        </div>

        <div style={styles.row} className="dashboard-row">
          <section style={styles.panel} className="dashboard-panel">
            <h2 style={styles.sectionTitle}>Top Stories</h2>
            <div style={{ ...styles.card, height: 420 }} className="dashboard-card-short">
              <News />
            </div>
          </section>

          <section style={{ ...styles.panel, flex: 2 }} className="dashboard-panel">
            <h2 style={styles.sectionTitle}>Market Quotes</h2>
            <div style={{ ...styles.card, height: 420 }} className="dashboard-card-short">
              <iframe
                src="https://s.tradingview.com/embed-widget/market-quotes/?locale=en#%7B%22colorTheme%22%3A%22light%22%2C%22isTransparent%22%3Afalse%2C%22showSymbolLogo%22%3Atrue%2C%22backgroundColor%22%3A%22%23ffffff%22%2C%22locale%22%3A%22en%22%2C%22width%22%3A%22100%25%22%2C%22height%22%3A%22100%25%22%2C%22symbolsGroups%22%3A%5B%7B%22name%22%3A%22Indices%22%2C%22symbols%22%3A%5B%7B%22name%22%3A%22FOREXCOM%3ASPXUSD%22%2C%22displayName%22%3A%22S%26P%20500%22%7D%2C%7B%22name%22%3A%22FOREXCOM%3ANSXUSD%22%2C%22displayName%22%3A%22Nasdaq%20100%22%7D%2C%7B%22name%22%3A%22FOREXCOM%3ADJI%22%2C%22displayName%22%3A%22Dow%2030%22%7D%5D%7D%2C%7B%22name%22%3A%22Stocks%22%2C%22symbols%22%3A%5B%7B%22name%22%3A%22NASDAQ%3AAAPL%22%7D%2C%7B%22name%22%3A%22NASDAQ%3AGOOGL%22%7D%2C%7B%22name%22%3A%22NASDAQ%3AMSFT%22%7D%2C%7B%22name%22%3A%22NYSE%3AJPM%22%7D%2C%7B%22name%22%3A%22NYSE%3ABAC%22%7D%5D%7D%5D%7D"
                style={{ width: "100%", height: "100%", border: "none" }}
                title="Market Quotes"
              />
            </div>
          </section>
        </div>

      </main>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  root: {
    minHeight: "100vh",
    background: "#f5f6f8",
    color: "#111",
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
  },
  main: {
    maxWidth: 1400,
    margin: "0 auto",
    padding: "28px 24px 48px",
    display: "flex",
    flexDirection: "column",
    gap: 28,
  },
  row: {
    display: "flex",
    gap: 24,
    alignItems: "flex-start",
  },
  panel: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 12,
    minWidth: 0, 
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 700,
    color: "#111",
    margin: 0,
    letterSpacing: "-0.01em",
  },
  card: {
    background: "#ffffff",
    borderRadius: 12,
    border: "1px solid #e4e6ea",
    overflow: "hidden",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
  },
};

export default Dashboard;