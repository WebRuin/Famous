/**
 * @ngdoc directive
 * @name faScrollView
 * @module famous.angular
 * @restrict E
 * @description
 * This directive allows you to specify a {@link https://famo.us/docs/views/Scrollview famo.us Scrollview}
 * that will lay out a collection of renderables sequentially in the specified direction
 * and will allow you to scroll through them with mousewheel or touch events.
 *
 * @usage
 * ```html
 * <fa-scroll-view>
 *   <fa-view>
 *     <!-- content -->
 *   </fa-view>
 * </fa-scroll-view>
 * ```
 *
 * @example
 * ### Scroll View + Events + ng-repeat
 * In the example below, `fa-scroll-view` displays a collection of nested `fa-views` generated by ng-repeat.
 * In Famous, events are not propagated from these nested `fa-view`'s to its parent `fa-scroll-view`.
 *
 * When a nested View needs to trigger higher-order app behavior within another View (such as a Scroll View), the best practice is to pass data via Famous Events.
 *
 * To use a Scroll View, create an instance of a Famous Event Handler on the scope.  Within each ng-repeated `fa-view` are nested `fa-surface`s.  Pipe all Surface events to the event handler using `fa-pipe-to`, and then specify that the Scroll View will receive events from that specific event handler using `fa-pipe-from`.
 *
 * Input events (like click or mousewheel) are captured on Surfaces, and piping must be used to specify where the events will broadcast and be received.
 * This will enable scrolling by connecting input events from the `fa-surface`s to the `fa-scroll-view`, otherwise the Scroll View will not receive mousewheel events.
 *
 <example module="faScrollViewExampleApp">
  <file name="index.html">
  <fa-app ng-controller="ScrollCtrl">
      <!-- fa-scroll-view receives all events from $scope.myEventHandler, and decides how to handle them -->
      <fa-scroll-view fa-pipe-from="myEventHandler">
          <fa-view ng-repeat="view in views">
            <fa-modifier fa-size="[undefined, 160]">
            <!-- All events on fa-surfaces (click, mousewheel) are piped to $scope.myEventHandler -->
               <fa-surface fa-background-color="view.color"
                            fa-pipe-to="myEventHandler">
               </fa-surface>
              </fa-modifier>
          </fa-view>
      </fa-scroll-view>
    </fa-app>

    <script>
      angular.module('faScrollViewExampleApp', ['famous.angular'])
          .controller('ScrollCtrl', ['$scope', '$famous', function($scope, $famous) {
            
            var EventHandler = $famous['famous/core/EventHandler'];

            $scope.views = [{color: 'red'}, {color: 'blue'}, {color: 'green'}, {color: 'yellow'}, {color: 'orange'}];

            $scope.myEventHandler = new EventHandler();

        }]);
    </script>
  </file>
  <file name="style.css">
  fa-app {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
  </file>
 </example>
 *
 * To specify (optional) configurable options for the Scroll View, bind an object on the scope to the `fa-options` attribute on `fa-scroll-view`.
 * Notable options include `clipSize`, which specifies the size of the area in pixels to display content in, and `direction`, which specifies whether the nested views will scroll horizontally or vertically (1 is vertical, 0 is horizontal).
 * A full list of configurable options for Scroll View may be found at https://famo.us/docs/0.2.0/views/Scrollview/.
 *
 <example module="faScrollViewExampleApp">
  <file name="index.html">
  <fa-app ng-controller="ScrollCtrl">
      <fa-scroll-view fa-pipe-from="myEventHandler" fa-options="options.myScrollView">
          <fa-view ng-repeat="view in list">
            <fa-modifier fa-size="[500, 320]">
               <fa-surface fa-background-color="view.color"
                            fa-pipe-to="myEventHandler">
                  {{view.content}}
               </fa-surface>
              </fa-modifier>
          </fa-view>
      </fa-scroll-view>
    </fa-app>

    <script>
      angular.module('faScrollViewExampleApp', ['famous.angular'])
          .controller('ScrollCtrl', ['$scope', '$famous', function($scope, $famous) {
            
            var EventHandler = $famous['famous/core/EventHandler'];
            $scope.myEventHandler = new EventHandler();
            $scope.list = [{content: "Scroll", color: "red"}, {content: "horizontally", color: "blue"}, {content: "yay!", color: "green"}, {content: "woo!", color: "yellow"}];
            
            $scope.options = {
              myScrollView: {
                clipSize: 100,
                paginated: false,
                speedLimit: 5,
                direction: 0,
              }
            };

        }]);
    </script>
  </file>
  <file name="style.css">
  fa-app {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
  </file>
 </example>
 *
 *
 * ### Scroll View with explicitly created views
 * `Fa-index` determines the order of which the surfaces appear in the sequential view.
 * In this example below, a Scroll View is created with two nested `fa-view`'s, both of which have an `fa-index` of 0 and 1, respectively.
 *
 * If `fa-index` is declared explicitly, it will override any default order of `fa-view`'s declared in html.
 * If `fa-views` are created with an ng-repeat, they are automatically assigned the $index property, unless explicitly set.
 * The `fa-view` with the blue background color appears after the one with the red background because its `fa-index` is set to 1.
 *
 * `fa-scroll-view` accepts another attribute called `fa-start-index`, which determines which `fa-view` the Scroll View displays by default.
 * `Fa-start-index` will not affect the sequential order of the layout; the `fa-view` with the red background will be layed out first, followed by the one with the blue background.
 * By setting `fa-start-index` to 1, the Scroll View will display the View with the index of 1 by default, "starting" at the index of 1, which is the View with the blue background color.
 *
 <example module="faScrollViewExampleApp">
  <file name="index.html">
  <fa-app ng-controller="ScrollCtrl" style="width: 100%; height: 320px; overflow: hidden;">
      <!-- The scroll View will start at the index of 1 -->
       <fa-scroll-view fa-pipe-from="eventHandler" fa-options="options.scrollViewTwo" fa-start-index="1">
         <!-- Even though this view is declared first in html, it will will be layed out 2nd -->
         <!-- On page load, the scroll View will scroll to this view, and display it.  -->
          <fa-view fa-index="1">
             <fa-modifier fa-size="[undefined, 320]">
                <fa-surface fa-pipe-to="eventHandler"
                            fa-background-color="'blue'">
                  I am first in html, but displayed second!
                </fa-surface>
             </fa-modifier>
          </fa-view>

          <fa-view fa-index="0">
             <fa-modifier fa-size="[undefined, 320]">
                <fa-surface fa-pipe-to="eventHandler"
                            fa-background-color="'red'">
                  I am second in html, but displayed first!  Scroll horizontally!
                </fa-surface>
             </fa-modifier>
          </fa-view>

       </fa-scroll-view>
    </fa-app>

    <script>
      angular.module('faScrollViewExampleApp', ['famous.angular'])
          .controller('ScrollCtrl', ['$scope', '$famous', function($scope, $famous) {
            
            var EventHandler = $famous['famous/core/EventHandler'];
            $scope.eventHandler = new EventHandler();
            $scope.list = [{content: "famous"}, {content: "angular"}, {content: "rocks!"}];
            
            $scope.options = {
              scrollViewTwo: {
                direction: 0,
                paginated: true
              }
            };

        }]);
    </script>
  </file>
 </example>
 *
 *
 * ### Combining multiple Scroll Views
 *
 * Combining both approaches above (a Scroll View with ng-repeated views, and one with explicitly created views), one can can nest a Scroll View within another Scroll View.
 * A Scroll View is a Famous widget that displays a collection of views sequentially; it is agnostic about the Views that are inside of it; it only requires that events are piped from Surfaces to the ScrollView.
 *
 * In the example below, the outer Scroll View contains two explictly created Views.  One of those Views contains another Scroll View with sub-views created through an ngRepeat.
 * The outer Scroll View is passed an option for its `direction` to be `horizontal (0)`, and the inner Scroll View is passed an option for a `vertical direction (1)`.
 *
 <example module="faScrollViewExampleApp">
  <file name="index.html">
  <fa-app ng-controller="ScrollCtrl" style="width: 100%; height: 568px;">
      <!-- outer scroll view that scrolls horizontally between "main" view and "sidebar" view-->
      <fa-scroll-view fa-pipe-from="eventHandler" fa-options="options.scrollViewOuter">
    
        <!-- sidebar view -->
        <fa-view fa-index="0">
          <fa-modifier fa-size="[200, undefined]" id="sideBarMod">
              <fa-surface fa-pipe-to="eventHandler"
                          fa-background-color="'blue'"
                          fa-size="[undefined, undefined]">
                Sidebar (scroll horizontally to hide)
              </fa-surface>
            </fa-modifier>
        </fa-view>
    
        <!-- main view -->
        <fa-view fa-index="1">
        <!-- inner scroll view that scrolls vertically-->
          <fa-scroll-view fa-pipe-from="eventHandler" fa-options="options.scrollViewInner">
            <fa-view ng-repeat="item in list">
              <fa-surface fa-pipe-to="eventHandler"
                          fa-size="[undefined, 200]"
                          fa-background-color="'red'">
                {{item.content}}
              </fa-surface>
            </fa-view>
          </fa-scroll-view>
        </fa-view>
    
      </fa-scroll-view>
    </fa-app>

    <script>
      angular.module('faScrollViewExampleApp', ['famous.angular'])
          .controller('ScrollCtrl', ['$scope', '$famous', function($scope, $famous) {
            
            var EventHandler = $famous['famous/core/EventHandler'];
            $scope.eventHandler = new EventHandler();
            $scope.list = [{
              content: "Awesome content"
            },{
              content: "Scroll vertically to see more awesome content"
            },{
              content: "Famo.us/angular rocks!"
              }
            ];
            
            $scope.options = {
              scrollViewOuter: {
                direction: 0,
                paginated: true
              },
              scrollViewInner :{
                direction: 1
              }
            };

        }]);
    </script>
  </file>
 </example>
 *
 */

angular.module('famous.angular')
  .directive('faScrollView', ['$famous', '$famousDecorator', function ($famous, $famousDecorator) {
    return {
      template: '<div></div>',
      restrict: 'E',
      transclude: true,
      scope: true,
      compile: function(tElem, tAttrs, transclude){
        return  {
          pre: function(scope, element, attrs){
            var isolate = $famousDecorator.ensureIsolate(scope);

            var ScrollView = $famous["famous/views/Scrollview"];
            var ViewSequence = $famous['famous/core/ViewSequence'];
            var Surface = $famous['famous/core/Surface'];

            var _children = [];

            var options = scope.$eval(attrs.faOptions) || {};
            isolate.renderNode = new ScrollView(options);

            $famousDecorator.addRole('renderable',isolate);
            isolate.show();


            var _postDigestScheduled = false;

            var updateScrollview = function(init){

              //perf: don't both updating if we've already
              //scheduled an update for the end of this digest
              if(_postDigestScheduled === true) return;

              // Synchronize the update on the next digest cycle
              // (if this isn't done, $index will not be up-to-date
              // and sort order will be incorrect.)
              scope.$$postDigest(function(){
                _postDigestScheduled = false;
                _children.sort(function(a, b){
                  return a.index - b.index;
                });

                var options = {
                  array: function(_children) {
                    var _ch = [];
                    angular.forEach(_children, function(c, i) {
                      _ch[i] = c.renderGate;
                    });
                    return _ch;
                  }(_children)
                };
                //set the first page on the scrollview if
                //specified
                if(init)
                  options.index = scope.$eval(attrs.faStartIndex);

                var viewSeq = new ViewSequence(options);
                isolate.renderNode.sequenceFrom(viewSeq);
              });

              _postDigestScheduled = true;
            };

            $famousDecorator.sequenceWith(
              scope,
              function(data) {
                _children.push(data);
                updateScrollview(true);
              },
              function(childScopeId) {
                _children = function(_children) {
                  var _ch = [];
                  angular.forEach(_children, function(c) {
                    if (c.id !== childScopeId) {
                      _ch.push(c);
                    }
                  });
                  return _ch;
                }(_children);
                updateScrollview();
              },
              updateScrollview
            );

          },
          post: function(scope, element, attrs){
            var isolate = $famousDecorator.ensureIsolate(scope);

            transclude(scope, function(clone) {
              element.find('div').append(clone);
            });

            $famousDecorator.registerChild(scope, element, isolate);

          }
        };
      }
    };
  }]);
