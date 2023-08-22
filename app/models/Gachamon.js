


export class Gachamon {
  // NOTE the constructors parameters can share member names with parameter names
  constructor({ name, icon, picture, rarity }) {
    this.name = name
    this.icon = icon
    this.picture = picture
    this.rarity = rarity
  }


  get ListTemplate() {
    // NOTE -------------------------------------------------------⬇️ interpolating strings into other strings removes the quotes, don't for get to put them back in ---------------------⬇️-----------⬇️
    return `<button onclick="app.GachamonsController.selectGachamon('${this.name}')" class="btn col-1 fs-3 ${this.ComputeRarityStyle}" title="${this.name}">${this.icon}</button>`
  }

  get ActiveTemplate() {
    return `
      <div class="col-12 col-md-8 text-center active-gachamon">
        <img src="${this.picture}" class="img-fluid ${this.ComputeRarityStyle}"/>
        <p class="text-center fw-bold fs-3">${this.name} ${this.rarity}</p>
      </div>
    `
  }

  get ComputeRarityStyle() {
    switch (this.rarity) {
      case 'rare': return 'gachamon shiny'

      case 'ultra-rare': return 'gachamon reverse'

      default: return 'gachamon'
    }
  }
}