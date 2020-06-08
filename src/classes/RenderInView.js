class RenderInView {
  active = true
	renderInView = true
  visible = false
  
  constructor(wx, wy, x, y, z, obj) {
    this.props = { wx, wy, x, y, z, obj } 

    this.renderInView = () => {
      this.visible = true
      this.render()
    }

    this.hideInView = () => {
      this.visible = false
      this.hide()
    }
  }
}