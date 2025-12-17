<script setup lang="ts">
import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from './Button.vue'

describe('Button.vue', () => {
  it('renders button with default props', () => {
    const wrapper = mount(Button)
    expect(wrapper.find('button').exists()).toBe(true)
    expect(wrapper.text()).toContain('Button')
  })

  it('renders with custom text', () => {
    const wrapper = mount(Button, {
      slots: {
        default: 'Click me',
      },
    })
    expect(wrapper.text()).toContain('Click me')
  })

  it('renders as link when href is provided', () => {
    const wrapper = mount(Button, {
      props: {
        href: 'https://example.com',
        target: '_blank',
      },
    })
    expect(wrapper.find('a').exists()).toBe(true)
    expect(wrapper.attributes('href')).toBe('https://example.com')
    expect(wrapper.attributes('target')).toBe('_blank')
  })

  it('disables button when disabled prop is true', () => {
    const wrapper = mount(Button, {
      props: {
        disabled: true,
      },
    })
    expect(wrapper.find('button').attributes('disabled')).toBeDefined()
  })

  it('emits click event', async () => {
    const wrapper = mount(Button)
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('click')).toHaveLength(1)
  })

  it('applies correct type class', () => {
    const wrapper = mount(Button, {
      props: {
        type: 'primary',
      },
    })
    expect(wrapper.classes()).toContain('primary')
  })

  it('applies correct size class', () => {
    const wrapper = mount(Button, {
      props: {
        size: 'large',
      },
    })
    expect(wrapper.classes()).toContain('large')
  })

  it('shows loading icon when loading is true', () => {
    const wrapper = mount(Button, {
      props: {
        loading: true,
      },
    })
    // 检查是否渲染了 Icon 组件
    expect(wrapper.findComponent({ name: 'Icon' }).exists()).toBe(true)
  })

  it('handles mouse events correctly', async () => {
    const wrapper = mount(Button)
    const button = wrapper.find('button')

    // 模拟鼠标按下
    await button.trigger('mousedown')
    expect(wrapper.classes()).toContain('pressed')

    // 模拟鼠标抬起
    await button.trigger('mouseup')
    expect(wrapper.classes()).not.toContain('pressed')
  })

  it('does not respond to mouse events when disabled', async () => {
    const wrapper = mount(Button, {
      props: {
        disabled: true,
      },
    })
    const button = wrapper.find('button')

    await button.trigger('mousedown')
    expect(wrapper.classes()).not.toContain('pressed')
  })
})
</script>
