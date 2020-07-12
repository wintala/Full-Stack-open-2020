
const user = {
  name: 'Testi testinen',
  username: 'testuser',
  password: '12345'
}

const blogs = [
  {
    title: 'blog1',
    author: 'testauthor',
    url: 'www.blogi.fi',
    likes: 12
  },
  {
    title: 'blog2',
    author: 'testauthor',
    url: 'www.blogi.fi',
    likes: 0
  },
  {
    title: 'blog3',
    author: 'testauthor',
    url: 'www.blogi.fi',
    likes: 3
  }
]

const successfulLogin = () => {
  cy.get('#username').type(user.username)
  cy.get('#password').type(user.password)
  cy.get('#login-button').click()
}

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('Login from is shown', function() {
    cy.contains('Log in')
  })
})


describe('Login',function() {
  before(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
  })

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('succeeds with correct credentials', function() {
    successfulLogin()
    cy.contains('blogs')
  })

  it('fails with wrong credentials', function() {
    cy.get('#username').type(user.username)
    cy.get('#password').type('ei sinne päinkään')
    cy.get('#login-button').click()
    cy.get("#notification").contains('Wrong username or password')
  })
})


describe('Creating blog', function() {
  before(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3000')

    successfulLogin()
  })

  it('A blog can be created', function() {
    cy.contains('add new blog').click()
    cy.get('#title').type(blogs[0].title)
    cy.get('#author').type(blogs[0].author)
    cy.get('#url').type(blogs[0].url)

    cy.get('#create-button').click()

    cy.contains(`${blogs[0].title} ${blogs[0].author}`)
  })
})

describe('Operations with existing blog', function() {
  before(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.request('POST', 'http://localhost:3001/api/login', user).then(u => {
      const req = {
        method: "POST",
        headers: { Authorization: `bearer ${u.body.token}`},
        url: 'http://localhost:3001/api/blogs',
        body: blogs[0]
      }
      cy.request(req)
    })
  })

  beforeEach(function() {
    cy.visit('http://localhost:3000')
    successfulLogin()
  })

  it('A blog can be liked', function() {
    cy.get("#info-button").click()
    cy.get("#like-button").click()

    cy.contains(`${blogs[0].likes + 1}`)
  })

  it('A blog can be deleted', function() {
    cy.get("#info-button").click()
    cy.get("#delete-button").click()

    cy.contains('testiblogi testikirjoittaja').should('not.exist');
  })
})



describe('Multiple blogs', function() {
  before(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
  })

  beforeEach(function() {
  cy.request('POST', 'http://localhost:3001/api/users', user)
  cy.request('POST', 'http://localhost:3001/api/login', user).then(async u => {
    const req = {
      method: "POST",
      headers: { Authorization: `bearer ${u.body.token}`},
      url: 'http://localhost:3001/api/blogs'
    }

    for (const blog of blogs) {
      cy.request({...req, body: blog})
    }
  })

  cy.visit('http://localhost:3000')
  successfulLogin()
})

  it('A blogs are sorted according to likes', function() {
    const sortedBlogs = [...blogs].sort((a, b) => (b.likes - a.likes))

    const getNthBlog = (index) => {
      let elem = cy.get("#blog").first()
      for (let i=0; i<index; i++) {
        elem = elem.next()
      }
      return elem
    }

    sortedBlogs.forEach((blog, i) => {
      getNthBlog(i).contains(blog.title)
    })
  })
})