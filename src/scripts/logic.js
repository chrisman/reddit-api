module.exports = {
  getExcludes: function(str){
    var collector = []

    for (t in str.split(' '))
      if (str.split(' ')[t].includes('not:'))
        collector.push(str.split(' ')[t].split(':')[1])

    return collector
  },

  getSearchTerm: function(str){
    var collector = []

    for (t in str.split(' '))
      if (!(str.split(' ')[t].includes('not:'))){
        collector.push(str.split(' ')[t])
      }
    collector = collector.join('%20').toLowerCase()

    return collector
  },

  getArrayExcluding: function(arr, exc){
    for (e of exc)
      arr = arr.filter(function(i){
        return (!(i.data.title.toLowerCase().includes(e))) && (!(i.data.public_description.toLowerCase().includes(e)))
      })
    return arr
  }
}
