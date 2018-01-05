
activate :autoprefixer do |prefix|
  prefix.browsers = "last 2 versions"
end

config[:baseurl] = ''

# Per-page layout changes
page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false

configure :build do
  config[:baseurl] = "" # see https://forum.middlemanapp.com/t/trouble-with-link-to-and-relative-links-for-gh-pages/1864/2
end
