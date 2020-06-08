import '../assets/styles/footer.less'
export default {
  data () {
    return {
      author: 'connie'
    }
  },
  render () {
    return (
      <div id="footer">
        <span>written by {this.author}</span>
      </div>
    )
  }
}
