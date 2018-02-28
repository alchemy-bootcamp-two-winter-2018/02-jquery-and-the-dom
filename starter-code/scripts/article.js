'use strict';

const articles = [];

// COMMENT: What is the purpose of the following function? Why is its name capitalized? Explain the context of "this" within the function. What does "rawDataObj" represent?
// This constructor function creates new instances of the Article object and assigns the keys of each new instance to match the keys of the object literal (in the "rawData" array) from which it is created (see the 'for' loop in line 49)

new Article ({name: 'lol', age: 5});

function Article (rawDataObj) {
    const arrayOfDataProps = Object.keys(rawDataObj);
    arrayOfDataProps.forEach((propName) => {
        this[propName] = rawDataObj[propName];
        // the article we're creating && the rawDataObj that was given
    });

/*  arrayOfDataProps.forEach()

    arrayOfDataProps = ['title', 'publishedOn', 'body', 'author'];

    ('title') => {
        newArticle['title'] = rawDataObj['title'];
    }

    ('publishedOn') => {
        newArticle['publishedOn'] = rawDataObj['publishedOn'];
    }

    ('body') => {
        newArticle['body'] = rawDataObj['body'];
    }

    ('author') => {
        newArticle['author'] = rawDataObj['author'];
    }

*/

/* Object.keys(rawDataObj)

    returns an array filled with strings that are the keys in rawDataObj

*/

/* callback function (propName) => {....}

    function (paramterName, etc, yay) { // code; }
    (param, parachute, pikachu) => { // code; }

*/


/*    this[propName] = rawDataObj[propName];

    hats.hit // object property
    hats['hit'] // also object property

    this.monkeys = 'something';
    this['monkeys'] = 'something else';

    const monkey = {
        name: 'jane',
        age: 5
    };

    const newMonkey = {};
    newMonkey['name'] = monkey['name'];

    const propertyToCopy = 'age';
    newMonkey[propertyToCopy] = monkey[propertyToCopy];
    // {age: }                    5
    // {age: 5}



*/



//line 9 runs the Object.keys method on rawDataObj for each key within the object literal in the rawData array (line 49 loop again), which returns an array with the keys in rawDatObj, and begins the forEach function (which acts like a modified 'for' loop with a built-in .length for the number of iterations on it).
//line 10 is what happens when the forEach loop runs, and it assigns to the new Article object created the key/value pair of the first item in the rawData array, and does this for every item in that array.
}

Article.prototype.toHtml = function() {
    // COMMENT: What is the benefit of cloning the article? (see the jQuery docs)
    // It's helpful to duplicate matched elements on a page. Clone copies the dynamic state of an element as well.
    const template = $('#article-template').clone().html();

    /* TODOne: We got the html from our template, but we need to turn the html string into a jQuery object and store it in our $newArticle variable. */
    const $newArticle = $(template);

    if (!this.publishedOn) $newArticle.addClass('draft');
    $newArticle.attr('data-js-category', this.category);
    $newArticle.find('#authorName').text(this.author);
    $newArticle.find('#authorName').attr('href',this.authorURL);
    $newArticle.find('#bookTitle').text(this.title);
    $newArticle.find('.article-body').html(this.body);
    $newArticle.find('time').attr('datetime',this.publishedOn);

    /* TODOne: Now use jQuery traversal and setter methods to fill in the rest of the current template clone with values of the properties of this particular Article instance.
    We need to fill in:
    1. author name,
    2. author url,
    3. article title,
    4. article body, and
    5. publication date. */

    // REVIEW: Display the date as a relative number of 'days ago'
    $newArticle.find('time').html('about ' + parseInt((new Date() - new Date(this.publishedOn)) / 60 / 60 / 24 / 1000) + ' days ago');
    $newArticle.append('<hr>');
    return $newArticle;
};

rawData.sort(function(a,b) {
    // REVIEW: Take a look at this sort method; This may be the first time we've seen it. Look at the docs and think about how the dates would be sorted if the callback were not included in this method.
    return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

// TODOne: Refactor these for loops using the .forEach() array method.



rawData.forEach(function(rawDataObj) {
    articles.push(new Article(rawDataObj));
});

articles.forEach(function(article) {
    $('#articles').append(article.toHtml());
});
