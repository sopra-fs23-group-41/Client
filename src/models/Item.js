
class Item {

    constructor(data = {})  {
        this.price = null;
        this.picture = null;
        this.link = null;
        this.name = null;
        this.category = null;
        Object.assign(this, data)
    }
}

export default Item;