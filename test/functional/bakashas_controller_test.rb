require 'test_helper'

class BakashasControllerTest < ActionController::TestCase
  setup do
    @bakasha = bakashas(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:bakashas)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create bakasha" do
    assert_difference('Bakasha.count') do
      post :create, bakasha: @bakasha.attributes
    end

    assert_redirected_to bakasha_path(assigns(:bakasha))
  end

  test "should show bakasha" do
    get :show, id: @bakasha
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @bakasha
    assert_response :success
  end

  test "should update bakasha" do
    put :update, id: @bakasha, bakasha: @bakasha.attributes
    assert_redirected_to bakasha_path(assigns(:bakasha))
  end

  test "should destroy bakasha" do
    assert_difference('Bakasha.count', -1) do
      delete :destroy, id: @bakasha
    end

    assert_redirected_to bakashas_path
  end
end
