import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ModeToggle } from './ModeToggle'
import { useTheme } from 'next-themes'

// Mock next-themes
vi.mock('next-themes', () => ({
  useTheme: vi.fn(),
}))

describe('ModeToggle', () => {
  const mockSetTheme = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    ;(useTheme as ReturnType<typeof vi.fn>).mockReturnValue({
      setTheme: mockSetTheme,
    })
  })

  it('renders without crashing', () => {
    render(<ModeToggle />)
    expect(screen.getByRole('button', { name: /toggle theme/i })).toBeInTheDocument()
  })

  it('opens the dropdown when clicked', async () => {
    const user = userEvent.setup()
    render(<ModeToggle />)

    const button = screen.getByRole('button', { name: /toggle theme/i })
    await user.click(button)

    expect(screen.getByRole('menuitem', { name: /light/i })).toBeInTheDocument()
    expect(screen.getByRole('menuitem', { name: /dark/i })).toBeInTheDocument()
    expect(screen.getByRole('menuitem', { name: /system/i })).toBeInTheDocument()
  })

  it('calls setTheme with "light" when Light is clicked', async () => {
    const user = userEvent.setup()
    render(<ModeToggle />)

    const button = screen.getByRole('button', { name: /toggle theme/i })
    await user.click(button)

    const lightOption = screen.getByRole('menuitem', { name: /light/i })
    await user.click(lightOption)

    expect(mockSetTheme).toHaveBeenCalledWith('light')
  })

  it('calls setTheme with "dark" when Dark is clicked', async () => {
    const user = userEvent.setup()
    render(<ModeToggle />)

    const button = screen.getByRole('button', { name: /toggle theme/i })
    await user.click(button)

    const darkOption = screen.getByRole('menuitem', { name: /dark/i })
    await user.click(darkOption)

    expect(mockSetTheme).toHaveBeenCalledWith('dark')
  })

  it('calls setTheme with "system" when System is clicked', async () => {
    const user = userEvent.setup()
    render(<ModeToggle />)

    const button = screen.getByRole('button', { name: /toggle theme/i })
    await user.click(button)

    const systemOption = screen.getByRole('menuitem', { name: /system/i })
    await user.click(systemOption)

    expect(mockSetTheme).toHaveBeenCalledWith('system')
  })
})
