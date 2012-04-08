require 'test_helper'

class PniyasControllerTest < ActionController::TestCase
  setup do
    @pniya = pniyas(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:pniyas)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create pniya" do
    assert_difference('Pniya.count') do
      post :create, pniya: @pniya.attributes
    end

    assert_redirected_to pniya_path(assigns(:pniya))
  end

  test "should show pniya" do
    get :show, id: @pniya
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @pniya
    assert_response :success
  end

  test "should update pniya" do
    put :update, id: @pniya, pniya: @pniya.attributes
    assert_redirected_to pniya_path(assigns(:pniya))
  end

  test "should destroy pniya" do
    assert_difference('Pniya.count', -1) do
      delete :destroy, id: @pniya
    end

    assert_redirected_to pniyas_path
  end
end
