game.splash("SQUARES!", "A to Block, B to Sprint")

namespace SpriteKind {
    export const Block = SpriteKind.create()
    export const FriendlyProjectile = SpriteKind.create()
}
function stopsprint () {
    speedx = 100
    speedy = 100
}
function blocking () {
    if (game.runtime() - lastp >= timebp) {
        player2.setKind(SpriteKind.Block)
        player2.setImage(assets.image`Squarepblocking`)
        pause(1000)
        player2.setKind(SpriteKind.Player)
        player2.setImage(assets.image`Squarep1`)
        lastp = game.runtime()
        player2.setImage(assets.image`Squarepnotready2`)
        pause(1000)
        player2.setImage(assets.image`Squarep3`)
    }
}
// sprint
function sprint () {
    speedx = 150
    speedy = 150
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Projectile, function (sprite, otherSprite) {
    bouncefvx2 = otherSprite.vx - otherSprite.vx - otherSprite.vx
    bouncefvy2 = otherSprite.vy - otherSprite.vy - otherSprite.vy
    bouncepvx2 = sprite.vx - sprite.vx - sprite.vx
    bouncepvy2 = sprite.vy - sprite.vy - sprite.vy
    sprite.setVelocity(bouncefvx2, bouncefvy2)
    otherSprite.setVelocity(bouncepvx2, bouncepvy2)
    otherSprite.setFlag(SpriteFlag.Ghost, true)
    pause(30)
    otherSprite.setFlag(SpriteFlag.Ghost, false)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (sprite, otherSprite) {
    game.over(false)
})
sprites.onOverlap(SpriteKind.Block, SpriteKind.Projectile, function (sprite, otherSprite) {
    otherSprite.setVelocity(otherSprite.vx - otherSprite.vx - otherSprite.vx, otherSprite.vy - otherSprite.vy - otherSprite.vy)
    otherSprite.setKind(SpriteKind.FriendlyProjectile)
    info.changeScoreBy(1)
    otherSprite.setImage(assets.image`FriendyBullet0`)
})
// Blocking Cooldown functions //
controller.player1.onButtonEvent(ControllerButton.A, ControllerButtonEvent.Pressed, function () {
    blocking()
})
sprites.onOverlap(SpriteKind.FriendlyProjectile, SpriteKind.Projectile, function (sprite, otherSprite) {
    bouncefvx = otherSprite.vx - otherSprite.vx - otherSprite.vx
    bouncefvy = otherSprite.vy - otherSprite.vy - otherSprite.vy
    bouncepvx = sprite.vx - sprite.vx - sprite.vx
    bouncepvy = sprite.vy - sprite.vy - sprite.vy
    sprite.setVelocity(bouncefvx, bouncefvy)
    otherSprite.setVelocity(bouncepvx, bouncepvy)
    otherSprite.setFlag(SpriteFlag.Ghost, true)
    pause(30)
    otherSprite.setFlag(SpriteFlag.Ghost, false)
})
controller.player1.onButtonEvent(ControllerButton.B, ControllerButtonEvent.Pressed, function () {
    sprint()
})
controller.player1.onButtonEvent(ControllerButton.B, ControllerButtonEvent.Released, function () {
    stopsprint()
})
let bouncepvy = 0
let bouncepvx = 0
let bouncefvy = 0
let bouncefvx = 0
let bouncepvy2 = 0
let bouncepvx2 = 0
let bouncefvy2 = 0
let bouncefvx2 = 0
let lastp = 0
let player2: Sprite = null
let speedy = 0
let speedx = 0
let timebp = 0
let spin2 = null


// varibles //
timebp = 1000
speedx = 100
speedy = 100
player2 = sprites.create(assets.image`Squarep0`, SpriteKind.Player)
player2.setStayInScreen(true)
// load the sprites then destroy them//
let projectile = sprites.create(assets.image`bullet2`, SpriteKind.Projectile)
projectile.destroy()
projectile.setFlag(SpriteFlag.AutoDestroy, true)
game.onUpdate(function () {
    controller.moveSprite(player2, speedx, speedy)
})
// Sqaures blocked and death functions //
game.onUpdateInterval(500, function () {
    projectile = sprites.createProjectileFromSide(assets.image`bullet2`, Math.randomRange(50, -50), Math.randomRange(50, -50))
})
