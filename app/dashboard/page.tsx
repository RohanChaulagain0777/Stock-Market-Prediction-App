"use client";

import Navbar from '../components/Navbar';
import TradingView from '@/components/ui/TradingView';
import HeatMap from '@/components/ui/HeatMap';
import News from "@/components/ui/News";

const Dashboard = () => {
  return (
    <div className="dashboard-root">
      <Navbar />

      {/* Ambient background FX */}
      <div className="dashboard-bg" aria-hidden="true">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="grid-overlay" />
      </div>

      <main className="dashboard-main">

        {/* Header */}
        <header className="dashboard-header">
          <div className="header-eyebrow">
            <span className="live-dot" />
            <span>Live Market Data</span>
          </div>
          <h1 className="dashboard-title">
            Market <span className="title-accent">Dashboard</span>
          </h1>
          <p className="dashboard-subtitle">
            Real-time charts, Market quotes & top financial news — all in one place.
          </p>
        </header>


        {/* Primary grid: chart + quotes */}
        <section className="widgets-grid">
          <div className="widget-card widget-chart">
            <div className="widget-header">
              <span className="widget-badge">HeatMap</span>
              <h2 className="widget-title">HeatMap Quotes</h2>
            </div>
            <div className="widget-body">
              <HeatMap />
            </div>
          </div>

          <div className="widget-card widget-Heatmap">
            <div className="widget-header">
              <span className="widget-badge">Chart</span>
              <h2 className="widget-title">Symbol Overview</h2>
            </div>
            <div className="widget-body">
              <TradingView />
            </div>
          </div>
        </section>

        {/* News */}
        <section className="news-section">
          <div className="widget-card widget-news">
            <div className="widget-header">
              <span className="widget-badge">News</span>
              <h2 className="widget-title">Top Stories</h2>
            </div>
            <div className="widget-body">
              <News />
            </div>
          </div>
        </section>

      </main>
    </div>
  )
}

export default Dashboard