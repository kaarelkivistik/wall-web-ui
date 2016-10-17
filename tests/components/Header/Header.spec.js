import React from 'react'
import { Header } from 'components/Header/Header'
import { IndexLink, Link } from 'react-router'
import { shallow } from 'enzyme'

describe('(Component) Header', () => {
  global.apiUrl = "foobar"

  it("Should render a login button or a username.", () => {
    let wrapper = shallow(
      <Header
        user={null}/>
    )

    let elements = wrapper.find(".login")

    expect(elements).to.have.length(1)
    expect(elements.first().prop("href")).to.equal("foobar/authenticate")

    expect(wrapper.find(".add")).to.have.length(0)

    wrapper = shallow(
      <Header
        user={{username: "kaarel"}}/>
    )

    elements = wrapper.find(".login")

    expect(elements).to.have.length(0)

    elements = wrapper.find(".username")

    expect(elements).to.have.length(1)
    expect(elements.first().text()).to.match(/kaarel/)

    elements = wrapper.find(".add")

    expect(elements).to.have.length(1)
    expect(elements.first().type()).to.be.equal(Link)
    expect(elements.first().prop("to")).to.be.equal("/upload")
  })
})
