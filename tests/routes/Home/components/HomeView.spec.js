import React from 'react'
import { HomeView } from 'routes/Home/components/HomeView'
import { render, mount } from 'enzyme'
import { spy } from 'sinon';

describe('(View) Home', () => {
  it("Should fetch user data when appropriate", () => {
    const fetchUserInfoSpy = spy()
    const setTokenSpy = spy()

    let wrapper = mount(
      <HomeView 
        newToken="m645mn5b5m67bn324323kjnkn"
        setToken={setTokenSpy}
        fetchUserInfo={fetchUserInfoSpy}
      />
    )

    expect(setTokenSpy.calledOnce).to.be.true
    expect(setTokenSpy.args[0]).to.deep.equal(["m645mn5b5m67bn324323kjnkn"])

    expect(fetchUserInfoSpy.calledOnce).to.be.true

    wrapper = mount(
      <HomeView 
        setToken={setTokenSpy}
        fetchUserInfo={fetchUserInfoSpy}
      />
    )

    expect(setTokenSpy.calledOnce, "should set token only when provided").to.be.true
    expect(fetchUserInfoSpy.calledOnce).to.be.true
  })
})
