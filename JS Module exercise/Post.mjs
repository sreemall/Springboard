export default class Post {
    constructor (title, content) {
        this.title = title;
        this.content = content;
    }
    publish () {
        console.log (`Publishing Post with  Title: ${this.title}  Content: ${this.content}`);
    }
}