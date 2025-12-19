import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { Skeleton, SkeletonGroup } from './index'

describe('Skeleton', () => {
  it('renders skeleton with default props', () => {
    const { container } = render(<Skeleton />)
    const skeleton = container.querySelector('.ui-skeleton')
    expect(skeleton).toBeTruthy()
  })

  it('renders skeleton with custom width and height', () => {
    const { container } = render(<Skeleton width={200} height={20} />)
    const skeleton = container.querySelector('.ui-skeleton') as HTMLElement
    expect(skeleton.style.width).toBe('200px')
    expect(skeleton.style.height).toBe('20px')
  })

  it('renders skeleton with string width and height', () => {
    const { container } = render(<Skeleton width="100%" height="20px" />)
    const skeleton = container.querySelector('.ui-skeleton') as HTMLElement
    expect(skeleton.style.width).toBe('100%')
    expect(skeleton.style.height).toBe('20px')
  })

  it('renders skeleton with custom border radius', () => {
    const { container } = render(<Skeleton borderRadius={8} />)
    const skeleton = container.querySelector('.ui-skeleton') as HTMLElement
    expect(skeleton.style.borderRadius).toBe('8px')
  })

  it('renders skeleton with shimmer animation', () => {
    const { container } = render(<Skeleton animation="shimmer" />)
    const skeleton = container.querySelector('.ui-skeleton.shimmer')
    expect(skeleton).toBeTruthy()
  })

  it('renders skeleton with pulse animation', () => {
    const { container } = render(<Skeleton animation="pulse" />)
    const skeleton = container.querySelector('.ui-skeleton.pulse')
    expect(skeleton).toBeTruthy()
  })

  it('renders skeleton with gradient animation', () => {
    const { container } = render(<Skeleton animation="gradient" />)
    const skeleton = container.querySelector('.ui-skeleton.gradient')
    expect(skeleton).toBeTruthy()
  })

  it('renders skeleton with no animation', () => {
    const { container } = render(<Skeleton animation="none" />)
    const skeleton = container.querySelector('.ui-skeleton')
    expect(skeleton).toBeTruthy()
  })

  it('renders multiple skeletons with count prop', () => {
    const { container } = render(<Skeleton count={3} />)
    const skeletons = container.querySelectorAll('.ui-skeleton')
    expect(skeletons.length).toBe(3)
  })

  it('renders multiple skeletons with custom gap', () => {
    const { container } = render(<Skeleton count={2} gap={16} />)
    const wrapper = container.querySelector('div') as HTMLElement
    expect(wrapper.style.gap).toBe('16px')
  })

  it('renders skeleton with custom base color', () => {
    const { container } = render(<Skeleton baseColor="#f0f0f0" />)
    const skeleton = container.querySelector('.ui-skeleton') as HTMLElement
    expect(skeleton.style.getPropertyValue('--skeleton-base-color')).toBe('#f0f0f0')
  })

  it('renders skeleton with custom highlight color', () => {
    const { container } = render(<Skeleton highlightColor="#ffffff" />)
    const skeleton = container.querySelector('.ui-skeleton') as HTMLElement
    expect(skeleton.style.getPropertyValue('--skeleton-highlight-color')).toBe('#ffffff')
  })

  it('renders skeleton with custom class', () => {
    const { container } = render(<Skeleton class="custom-class" />)
    const skeleton = container.querySelector('.custom-class')
    expect(skeleton).toBeTruthy()
  })

  it('renders skeleton with custom style', () => {
    const { container } = render(<Skeleton style={{ margin: '10px' }} />)
    const skeleton = container.querySelector('.ui-skeleton') as HTMLElement
    expect(skeleton.style.margin).toBe('10px')
  })
})

describe('SkeletonGroup', () => {
  it('renders skeleton group with default props', () => {
    const { container } = render(
      <SkeletonGroup>
        <Skeleton />
        <Skeleton />
      </SkeletonGroup>
    )
    const group = container.querySelector('.ui-skeleton-group')
    expect(group).toBeTruthy()
  })

  it('renders skeleton group with row direction', () => {
    const { container } = render(
      <SkeletonGroup direction="row">
        <Skeleton />
        <Skeleton />
      </SkeletonGroup>
    )
    const group = container.querySelector('.ui-skeleton-group.row')
    expect(group).toBeTruthy()
  })

  it('renders skeleton group with column direction', () => {
    const { container } = render(
      <SkeletonGroup direction="column">
        <Skeleton />
        <Skeleton />
      </SkeletonGroup>
    )
    const group = container.querySelector('.ui-skeleton-group.column')
    expect(group).toBeTruthy()
  })

  it('renders skeleton group with custom gap', () => {
    const { container } = render(
      <SkeletonGroup gap={20}>
        <Skeleton />
        <Skeleton />
      </SkeletonGroup>
    )
    const group = container.querySelector('.ui-skeleton-group') as HTMLElement
    expect(group.style.gap).toBe('20px')
  })

  it('renders skeleton group with children', () => {
    const { container } = render(
      <SkeletonGroup>
        <Skeleton width={40} height={40} borderRadius="50%" />
        <div>
          <Skeleton width={200} height={20} />
          <Skeleton width={300} height={16} style={{ marginTop: '8px' }} />
        </div>
      </SkeletonGroup>
    )
    const skeletons = container.querySelectorAll('.ui-skeleton')
    expect(skeletons.length).toBe(3)
  })
})
