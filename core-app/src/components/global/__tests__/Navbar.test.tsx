import React from 'react';
import { render, screen } from '@testing-library/react';
import Navbar from '../Navbar';

// Mock ResizeObserver for Radix UI
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock the next-themes hook since it's used in ModeToggle
jest.mock('next-themes', () => ({
  useTheme: () => ({
    theme: 'light',
    setTheme: jest.fn(),
  }),
}));

// Mock Avatar components to satisfy the specific "mock Avatar" requirement in issue
jest.mock('../../ui/avatar', () => ({
  Avatar: ({ children }: { children: React.ReactNode }) => <div data-testid="avatar">{children}</div>,
  // eslint-disable-next-line @next/next/no-img-element
  AvatarImage: ({ src, alt }: { src: string; alt?: string }) => <img data-testid="avatar-image" src={src} alt={alt} />,
  AvatarFallback: ({ children }: { children: React.ReactNode }) => <div data-testid="avatar-fallback">{children}</div>,
}));

// Mock Navigation Menu components (Dropdowns) to satisfy the "mock Dropdowns properly" requirement
// Use 'div' or React.Fragment instead of 'a' for NavigationMenuLink to avoid nested <a> tags warnings
jest.mock('../../ui/navigation-menu', () => ({
  NavigationMenu: ({ children }: { children: React.ReactNode }) => <nav data-testid="navigation-menu">{children}</nav>,
  NavigationMenuList: ({ children }: { children: React.ReactNode }) => <ul data-testid="navigation-menu-list">{children}</ul>,
  NavigationMenuItem: ({ children }: { children: React.ReactNode }) => <li data-testid="navigation-menu-item">{children}</li>,
  NavigationMenuTrigger: ({ children }: { children: React.ReactNode }) => <button data-testid="navigation-menu-trigger">{children}</button>,
  NavigationMenuContent: ({ children }: { children: React.ReactNode }) => <div data-testid="navigation-menu-content">{children}</div>,
  NavigationMenuLink: ({ children }: { children: React.ReactNode }) => <div data-testid="navigation-menu-link">{children}</div>,
}));

// Mock ModeToggle explicitly just in case NextThemes is complex
jest.mock('../ModeToggle', () => ({
  ModeToggle: () => <button data-testid="mode-toggle">Toggle theme</button>,
}));

describe('Navbar Component', () => {
  it('renders the brand name and avatar correctly', () => {
    render(<Navbar />);
    expect(screen.getByText('Cyber')).toBeInTheDocument();
    expect(screen.getByText('Fortress')).toBeInTheDocument();

    // Check that avatar mock is used
    expect(screen.getByTestId('avatar')).toBeInTheDocument();
    expect(screen.getByTestId('avatar-image')).toBeInTheDocument();
    expect(screen.getByTestId('avatar-fallback')).toBeInTheDocument();
  });

  it('renders the navigation menu items correctly', () => {
    render(<Navbar />);
    // Since we mocked NavigationMenu components, the triggers should be present
    const triggers = screen.getAllByTestId('navigation-menu-trigger');
    expect(triggers).toHaveLength(4); // Solutions, Pricing, Training, Resources

    expect(screen.getByText('Solutions')).toBeInTheDocument();
    expect(screen.getByText('Pricing')).toBeInTheDocument();
    expect(screen.getByText('Training')).toBeInTheDocument();
    expect(screen.getByText('Resources')).toBeInTheDocument();
  });

  it('renders the ModeToggle component', () => {
    render(<Navbar />);
    expect(screen.getByTestId('mode-toggle')).toBeInTheDocument();
  });
});
