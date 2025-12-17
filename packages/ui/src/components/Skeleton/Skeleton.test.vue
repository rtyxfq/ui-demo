<script setup lang="ts">
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Skeleton from './Skeleton.vue'
import SkeletonGroup from './SkeletonGroup.vue'

describe('Skeleton.vue', () => {
  it('renders skeleton with default props', () => {
    const wrapper = mount(Skeleton)
    expect(wrapper.find('.skeleton').exists()).toBe(true)
  })

  it('renders skeleton with custom width and height', () => {
    const wrapper = mount(Skeleton, {
      props: {
        width: 200,
        height: 20,
      },
    })
    const skeleton = wrapper.find('.skeleton')
    expect(skeleton.attributes('style')).toContain('width: 200px')
    expect(skeleton.attributes('style')).toContain('height: 20px')
  })

  it('renders skeleton with string width and height', () => {
    const wrapper = mount(Skeleton, {
      props: {
        width: '100%',
        height: '20px',
      },
    })
    const skeleton = wrapper.find('.skeleton')
    expect(skeleton.attributes('style')).toContain('width: 100%')
    expect(skeleton.attributes('style')).toContain('height: 20px')
  })

  it('renders skeleton with custom border radius', () => {
    const wrapper = mount(Skeleton, {
      props: {
        borderRadius: 8,
      },
    })
    const skeleton = wrapper.find('.skeleton')
    expect(skeleton.attributes('style')).toContain('border-radius: 8px')
  })

  it('renders skeleton with shimmer animation', () => {
    const wrapper = mount(Skeleton, {
      props: {
        animation: 'shimmer',
      },
    })
    expect(wrapper.find('.shimmer').exists()).toBe(true)
  })

  it('renders skeleton with pulse animation', () => {
    const wrapper = mount(Skeleton, {
      props: {
        animation: 'pulse',
      },
    })
    expect(wrapper.find('.pulse').exists()).toBe(true)
  })

  it('renders skeleton with gradient animation', () => {
    const wrapper = mount(Skeleton, {
      props: {
        animation: 'gradient',
      },
    })
    expect(wrapper.find('.gradient').exists()).toBe(true)
  })

  it('renders skeleton with no animation', () => {
    const wrapper = mount(Skeleton, {
      props: {
        animation: 'none',
      },
    })
    expect(wrapper.find('.none').exists()).toBe(true)
  })

  it('renders multiple skeletons with count prop', () => {
    const wrapper = mount(Skeleton, {
      props: {
        count: 3,
      },
    })
    const skeletons = wrapper.findAll('.skeleton')
    expect(skeletons.length).toBe(3)
  })

  it('renders multiple skeletons with custom gap', () => {
    const wrapper = mount(Skeleton, {
      props: {
        count: 2,
        gap: 16,
      },
    })
    const container = wrapper.find('div')
    expect(container.attributes('style')).toContain('gap: 16px')
  })

  it('renders skeleton with custom base color', () => {
    const wrapper = mount(Skeleton, {
      props: {
        baseColor: '#f0f0f0',
      },
    })
    const skeleton = wrapper.find('.skeleton')
    expect(skeleton.attributes('style')).toContain('--skeleton-base-color: #f0f0f0')
  })

  it('renders skeleton with custom highlight color', () => {
    const wrapper = mount(Skeleton, {
      props: {
        highlightColor: '#ffffff',
      },
    })
    const skeleton = wrapper.find('.skeleton')
    expect(skeleton.attributes('style')).toContain('--skeleton-highlight-color: #ffffff')
  })

  it('renders skeleton with custom class', () => {
    const wrapper = mount(Skeleton, {
      props: {
        class: 'custom-class',
      },
    })
    expect(wrapper.find('.custom-class').exists()).toBe(true)
  })

  it('renders skeleton with custom style', () => {
    const wrapper = mount(Skeleton, {
      props: {
        style: { margin: '10px' },
      },
    })
    const skeleton = wrapper.find('.skeleton')
    expect(skeleton.attributes('style')).toContain('margin: 10px')
  })
})

describe('SkeletonGroup.vue', () => {
  it('renders skeleton group with default props', () => {
    const wrapper = mount(SkeletonGroup, {
      slots: {
        default: '<div class="skeleton"></div><div class="skeleton"></div>',
      },
    })
    expect(wrapper.find('.skeletonGroup').exists()).toBe(true)
  })

  it('renders skeleton group with row direction', () => {
    const wrapper = mount(SkeletonGroup, {
      props: {
        direction: 'row',
      },
    })
    expect(wrapper.find('.row').exists()).toBe(true)
  })

  it('renders skeleton group with column direction', () => {
    const wrapper = mount(SkeletonGroup, {
      props: {
        direction: 'column',
      },
    })
    expect(wrapper.find('.column').exists()).toBe(true)
  })

  it('renders skeleton group with custom gap', () => {
    const wrapper = mount(SkeletonGroup, {
      props: {
        gap: 20,
      },
    })
    const group = wrapper.find('.skeletonGroup')
    expect(group.attributes('style')).toContain('gap: 20px')
  })
})
</script>
