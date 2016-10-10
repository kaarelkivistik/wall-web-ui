import HomeRoute from 'routes/Home'
import HomeView from 'routes/Home/components/HomeView'

describe('(Route) Home', () => {
  it('Should return a route configuration object', () => {
    expect(typeof HomeRoute).to.equal('object')
  })

  it('Should define a route component', () => {
    expect(HomeRoute.component).to.equal(HomeView)
  })
})
