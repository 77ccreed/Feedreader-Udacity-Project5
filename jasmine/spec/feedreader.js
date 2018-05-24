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

        it('have a valid url', () => {
            allFeeds.forEach((feed) => {
                //url is defined
                expect(feed.url).toBeDefined();
                //url is not empty
                expect(feed.url.length).toBeGreaterThan(0);
            });
        });

        it('have a valid name', () => {
            allFeeds.forEach((feed) => {
                // name is defined
                expect(feed.name).toBeDefined();
                // name is not empty
                expect(feed.name.length).toBeGreaterThan(0);
            });
        });

    });

    describe("The menu", function () {

        let bodyElement;
        beforeEach(function () {
            bodyElement = document.getElementsByTagName('body')[0];
        });

        it("hides menu by default", () => {
            expect(bodyElement.classList.contains('menu-hidden')).toBe(true);
        });

        // menu display when clicked and hide when clicked again
        it("changes visibility when clicked", () => {
            // menu display when clicked
            const menuIcon = document.querySelector('.menu-icon-link');
            // it show when clicked
            menuIcon.click();
            expect(bodyElement.classList.contains('menu-hidden')).toBe(false);
            // it hide when clicked
            menuIcon.click();
            expect(bodyElement.classList.contains('menu-hidden')).toBe(true);
        });
    });

    describe("Initial Entries", () => {

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
        // compare two different feed
        it('loads new feeds', (done) => {
            expect(feedB !== feedA).toBe(true);
            done();
        });
    });
}());