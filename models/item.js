class Item {
    constructor(id, name, detail, price, uri, ratings, unit=null) {
        this.id = id; // unique & number
        this.name = name; // string
        this.detail = detail; //string
        this.price = price; // float
        this.uri = uri; // string
        this.ratings = ratings; //list of objects where object is of Rating Class.
        this.unit = unit;
    }
}

export default Item;
