#= require jquery
#= require jquery_ujs
#= require underscore
#= require backbone
#= require jscolor

class WN.BasePage extends Backbone.View
  # All pages are attached to the body
  el: document.body

  initialize: (options) ->
    Backbone.pubSub = _.extend({}, Backbone.Events)
