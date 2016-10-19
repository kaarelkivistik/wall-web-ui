import React from 'react'
import { Header } from 'components/Header/Header'
import { Link } from 'react-router'
import { shallow } from 'enzyme'
import { spy } from 'sinon'

describe('(Component) Header', () => {
  beforeEach(() => {
    global.apiUrl = 'foobar'
    global.webSocketUrl = 'foobar'
  })

  it('Should render a login button or a username.', () => {
    let wrapper = shallow(
      <Header
        user={null} />
    )

    let elements = wrapper.find('.login')

    expect(elements).to.have.length(1)
    expect(elements.first().prop('href')).to.equal('foobar/authenticate')

    expect(wrapper.find('.add')).to.have.length(0)

    const setTokenSpy = spy()

    wrapper = shallow(
      <Header
        setToken={setTokenSpy}
        user={{ username: 'kaarel' }} />
    )

    elements = wrapper.find('.login')

    expect(elements).to.have.length(0)

    elements = wrapper.find('.username')

    expect(elements).to.have.length(1)
    expect(elements.first().text()).to.match(/kaarel/)

    elements.first().simulate('click')

    expect(setTokenSpy.calledOnce).to.be.true
    expect(setTokenSpy.args[0]).to.deep.equal([null])

    elements = wrapper.find('.add')

    expect(elements).to.have.length(1)
    expect(elements.first().type()).to.be.equal(Link)
    expect(elements.first().prop('to')).to.be.equal('/upload')
  })
})
