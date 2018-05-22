/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function () {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function () {
            // allFeeds variable has been defined
            expect(allFeeds).toBeDefined();
            // allFeeds variable is not empty
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have a valid url', () => {
            allFeeds.forEach((feed) => {
                //url is defined
                expect(feed.url).toBeDefined();
                //url is not empty
                expect(feed.url.length).toBeGreaterThan(0);
            });
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have a valid name', () => {
            allFeeds.forEach((feed) => {
                // name is defined
                expect(feed.name).toBeDefined();
                // name is not empty
                expect(feed.name.length).toBeGreaterThan(0);
            });
        });

    });


    /* TODO: Write a new test suite named "The menu" */
    describe("The menu", function () {
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it("hides menu by default", () => {
            expect($("body").hasClass("menu-hidden")).toBe(true);
        });
        /* TODO: Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        // menu display when clicked and hide when clicked again
        it("changes visibility when clicked", () => {
            // menu display when clicked
            $(".menu-icon-link").click();
            expect($("body").hasClass("menu-hidden")).toBe(false);
            // it hide when clicked
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });
    /* TODO: Write a new test suite named "Initial Entries" */
    describe("Initial Entries", () => {
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        // loadFeed() is asynchronous
        let feedLength;
        beforeEach((done) => {
            loadFeed(0, () => {
                feedLength = $('.feed .entry').length;
                done();
            });
        });
        // at least a single.entry element
        it('has at least one entry', (done) => {
            expect(feedLength).toBeGreaterThan(0);
            done();
        });
    });

    /* Test suite that checks the feed functionality*/
    describe('New Feed Selection', () => {
        /* Test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */

        // two different feed
        let feedA,
            feedB;

        // loadFeed() is asynchronous
        beforeEach((done) => {
            loadFeed(0, () => {
                feedA = document.querySelector('.feed').innerHTML;
            });

            loadFeed(1, () => {
                feedB = document.querySelector('.feed').innerHTML;
                done();
            });
        });

        /* Check if feeds have been added to the feedList*/
        it('loads new feeds', (done) => {
            expect(feedB !== feedA).toBe(true);
            done();
        });
    });

}());