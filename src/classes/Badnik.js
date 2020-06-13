class Badnik {

  remove() {
    new Explosion(this.iso.body.position.x,this.iso.body.position.y,this.iso.body.position.z);
    
    this.iso.destroy()
    
    if (this.shadow) {
  		this.shadow.iso.destroy()
    }

    Sounds.Destroy.play()
  }
}