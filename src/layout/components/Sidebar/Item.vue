<script>
import Vue from 'vue'
export default {
  name: 'MenuItem',
  functional: true,
  props: {
    icon1: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  render(h, context) {
    const { icon, title, icon1 } = context.props
    const vnodes = []

    if (icon) {
      if (icon.includes('el-icon')) {
        vnodes.push(<i class={[icon, 'sub-el-icon']} />)
      } else {
        vnodes.push(<svg-icon icon-class={icon}/>)
      }
    }
    if (title) {
      vnodes.push(<span slot='title'>{(title)}</span>)
    }
    if (icon1) {
      if (icon.includes('el-icon')) {
        vnodes.push(<i class={[icon1, 'sub-el-icon']} />)
      } else {
        vnodes.push(<svg-icon icon-class={icon1}/>)
      }
    }

    // console.log(vnodes)
    return vnodes
  }
}
</script>

<style scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}
</style>
