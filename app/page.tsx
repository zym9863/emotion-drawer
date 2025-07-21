'use client';

import { useState, useEffect } from 'react';
import TimeCapsuleForm from '@/components/TimeCapsuleForm';
import TimeCapsuleList from '@/components/TimeCapsuleList';
import LetGoForm from '@/components/LetGoForm';
import LetGoList from '@/components/LetGoList';
import WelcomeGuide from '@/components/WelcomeGuide';
import { initDemoData } from '@/lib/demo-data';
import { clsx } from 'clsx';
import { Clock, Heart, Menu, X, HelpCircle } from 'lucide-react';

type TabType = 'timeCapsule' | 'letGo';

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>('timeCapsule');
  const [showForm, setShowForm] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showWelcomeGuide, setShowWelcomeGuide] = useState(false);

  // 初始化演示数据和检查是否首次访问
  useEffect(() => {
    initDemoData();

    // 检查是否首次访问
    const hasVisited = localStorage.getItem('emotion-drawer-visited');
    if (!hasVisited) {
      setShowWelcomeGuide(true);
      localStorage.setItem('emotion-drawer-visited', 'true');
    }
  }, []);

  const handleSave = () => {
    setShowForm(false);
    setRefreshTrigger(prev => prev + 1);
  };

  const tabs = [
    {
      id: 'timeCapsule' as TabType,
      label: '时光胶囊',
      icon: Clock,
      description: '封存此刻的情绪与想法'
    },
    {
      id: 'letGo' as TabType,
      label: '释怀之约',
      icon: Heart,
      description: '与未来的自己约定和解'
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* 动态背景 */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 animate-gradient" />
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" />
        <div className="absolute top-40 right-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{ animationDelay: '4s' }} />
      </div>

      {/* Header */}
      <header className="glass border-b border-white/20 sticky top-0 z-40 animate-fade-in">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">情</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">情绪抽屉</h1>
                <p className="text-xs text-gray-600 hidden sm:block">记录情绪，释怀过往</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setShowForm(false);
                    }}
                    className={clsx(
                      'flex items-center gap-2 px-4 py-2 rounded-lg transition-all',
                      activeTab === tab.id
                        ? 'bg-purple-100 text-purple-700 shadow-sm'
                        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}

              <button
                onClick={() => setShowWelcomeGuide(true)}
                className="ml-2 p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all"
                title="使用指南"
              >
                <HelpCircle className="w-4 h-4" />
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-800"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id);
                        setShowForm(false);
                        setMobileMenuOpen(false);
                      }}
                      className={clsx(
                        'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left',
                        activeTab === tab.id
                          ? 'bg-purple-100 text-purple-700'
                          : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                      )}
                    >
                      <Icon className="w-5 h-5" />
                      <div>
                        <div className="font-medium">{tab.label}</div>
                        <div className="text-sm opacity-75">{tab.description}</div>
                      </div>
                    </button>
                  );
                })}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              {!showForm ? (
                <div className="text-center">
                  <button
                    onClick={() => setShowForm(true)}
                    className={clsx(
                      'w-full py-4 px-6 rounded-xl font-medium transition-all shadow-lg hover:shadow-xl',
                      activeTab === 'timeCapsule'
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600'
                        : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600'
                    )}
                  >
                    {activeTab === 'timeCapsule' ? '创建时光胶囊' : '创建释怀之约'}
                  </button>

                  <div className="mt-6 p-4 bg-white/60 rounded-lg">
                    <h3 className="font-medium text-gray-800 mb-2">
                      {tabs.find(tab => tab.id === activeTab)?.label}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {tabs.find(tab => tab.id === activeTab)?.description}
                    </p>
                  </div>
                </div>
              ) : (
                <div>
                  <button
                    onClick={() => setShowForm(false)}
                    className="mb-4 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    ← 返回
                  </button>

                  {activeTab === 'timeCapsule' ? (
                    <TimeCapsuleForm onSave={handleSave} />
                  ) : (
                    <LetGoForm onSave={handleSave} />
                  )}
                </div>
              )}
            </div>
          </div>

          {/* List Section */}
          <div className="lg:col-span-2">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 min-h-[600px]">
              {activeTab === 'timeCapsule' ? (
                <TimeCapsuleList refreshTrigger={refreshTrigger} />
              ) : (
                <LetGoList refreshTrigger={refreshTrigger} />
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t border-gray-200 mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-600 text-sm">
              "我不知道我怎么了，我也能释怀，并不能释怀"
            </p>
            <p className="text-gray-500 text-xs mt-2">
              在这里，记录情绪，与时间和解
            </p>
          </div>
        </div>
      </footer>

      {/* Welcome Guide */}
      <WelcomeGuide
        isOpen={showWelcomeGuide}
        onClose={() => setShowWelcomeGuide(false)}
      />
    </div>
  );
}
