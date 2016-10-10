import { CALL_API } from 'redux-api-middleware';
import {
  SET_TOKEN,
  FETCH_USER_INFO_REQUEST,
  FETCH_USER_INFO_SUCCESS,
  FETCH_USER_INFO_FAILURE,
  setToken,
  fetchUserInfo,
  userReducer,
  tokenReducer,
} from 'store/user'


describe('(Internal Module) User', () => {
	global.apiUrl = "foobar"

	it("Should export appropriate constants.", () => {
		expect(SET_TOKEN).to.equal("SET_TOKEN");
		expect(FETCH_USER_INFO_REQUEST).to.equal("FETCH_USER_INFO_REQUEST");
		expect(FETCH_USER_INFO_SUCCESS).to.equal("FETCH_USER_INFO_SUCCESS");
		expect(FETCH_USER_INFO_FAILURE).to.equal("FETCH_USER_INFO_FAILURE");
	})

	describe("(setToken)", () => {
		it("Should be a function", () => {
			expect(setToken).to.be.a("function")
		})

		it("Should return the correct action", () => {
			let action = setToken("54bhj534hvg")

			expect(action).to.have.property("token").and.equal("54bhj534hvg")
		})
	})

	describe("(fetchUserInfo)", () => {
		it("Should be a function", () => {
			expect(fetchUserInfo).to.be.a("function")
		})

		it("Should return the correct action", () => {
			let action = fetchUserInfo()

			expect(action).to.have.property(CALL_API)
			
			let apiCall = action[CALL_API]

			expect(apiCall).to.have.property("endpoint").and.equal("foobar/me")
			expect(apiCall).to.have.property("headers").and.to.be.a("function")

			let headers = apiCall.headers({
				"token": "5b34jh3k2323jkn5k" 
			})

			expect(headers).to.have.property("Authorization").and.equal("Bearer 5b34jh3k2323jkn5k")
		})

		it("Should bail when no token is set", () => {
			let action = fetchUserInfo()

			expect(action).to.have.property(CALL_API)
			
			let apiCall = action[CALL_API]

			expect(apiCall).to.have.property("bailout").and.to.be.a("function")

			let bailout = apiCall.bailout({
				"user": null
			})

			expect(bailout).to.be.true
		})
	})

	describe("(User reducer)", () => {
		it("Should be a function.", () => {
			expect(userReducer).to.be.a("function");
		})

		it("Should initialize with a state of null.", () => {
			expect(userReducer(undefined, {})).to.equal(null)
		})

		it("Should return previous state if action was not matched", () => {
			let state = userReducer(undefined, {})
			state = userReducer(state, { type: "k34j34nk43n354kjn354" })
			expect(state).to.equal(null)
		})

		it("Should should preserve user and username properties and clear them when appropriate.", () => {
			let state = userReducer(undefined, {})

			state = userReducer(state, {
				type: "FETCH_USER_INFO_SUCCESS", 
				payload: {
					"user": {
						"name": "Kaarel Kivistik",
						"username": "kaarel",
						"id": 18,
					}
				}
			})

			expect(state).not.to.be.null
			expect(state).to.have.property("name").and.equal("Kaarel Kivistik")
			expect(state).to.have.property("username").and.equal("kaarel")

			state = userReducer(state, {
				type: "FETCH_USER_INFO_FAILURE",
			})

			expect(state).to.be.null
		})

		it("Should clear user when token is cleared", () => {
			let state = userReducer(undefined, {})
			
			state = userReducer(state, {
				type: "FETCH_USER_INFO_SUCCESS", 
				payload: {
					"user": {
						"name": "Kaarel Kivistik",
						"username": "kaarel",
						"id": 18,
					}
				}
			})
			
			state = userReducer(state, {
				type: "SET_TOKEN", 
				token: null,
			})

			expect(state).to.be.null;
		})
	})

	describe("(Token reducer)", () => {
		it("Should be a function.", () => {
			expect(tokenReducer).to.be.a("function");
		})

		it("Should initialize with a state of null.", () => {
			expect(tokenReducer(undefined, {})).to.equal(null)
		})

		it("Should preserve token", () => {
			let state = tokenReducer(undefined, {})
			state = tokenReducer(state, setToken("kop78po867p8k6opk67"))

			expect(state).to.equal("kop78po867p8k6opk67")

			state = tokenReducer(state, {
				type: "FOOBAR"
			})

			expect(state).to.equal("kop78po867p8k6opk67")

			state = tokenReducer(state, setToken(false))

			expect(state).to.be.null
		})
	})

})
