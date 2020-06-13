function playPlayerSounds() {
  if (player.iso.action === "skid" && player.iso.previousAction !== "skid") {
    Sounds.Skidding.play()
  }

  if (player.iso.movement === "roll" && player.iso.previousMovement !== "roll") {
    Sounds.Roll.play()
  }

  if (player.iso.movement === "jump" && player.iso.previousMovement !== "jump") {
    Sounds.Jump.play()
  }

  if (player.iso.movement === "homing attack" && player.iso.previousMovement !== "homing attack") {
    Sounds.DropDash.play()
  }

  if (player.iso.movement === "slam" && player.iso.previousMovement !== "slam") {
    Sounds.MightyDrill.play()
  }
}