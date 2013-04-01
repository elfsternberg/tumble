Tumble is an implementation of the Tumblr parser/compiler/renderer,
with keyword substitutions suitable to my needs on my story website.
The idea is that the database side will produce an object consisting
of the title of a series


block:Series
    Must be found within a block:toc
    It must contain the special tag {titles} as a child tag.

    This will be rendered if this is a series page. 

block:Subseries

    Must be found within a block:toc
    It must contain the special tag {titles} as a child tag.

    This will be rendered for any subseries of the main series.  This
    will recurse to a maximum depth of four.  Users can use clever CSS
    to make this look awesome.  There may be settings in the database
    that prevent subseries recursion deliberately.  

block:Story
    Has two meanings, based on context.  

    If it is found in the *document* (i.e. *not* within a , it is treated at a story block,
    and will only be rendered if this is a story page.

    If it is found in a *series* or *subseries* block, it's contents
    are rendered during the rendering of a series or subseries for
    each story found.

block:Next
    Valid only in a block:story
    Will render if there is a "next" story in the parent series.

block:Prev
    Valid only in a block:story
    Will render if there is a "previous" story in the parent series.

block:Title
    Will render if there is a title in the current context

block:Blurb
    Will render if there is a blurb.

block:Excerpt
    Will render if there is an excerpt

Variables:

Title
    The title in the current context.  

Body
    The body of the story.  Only available in top-level block:story.

SeriesTitle
    The title of the series in the current context.

MainSeriesTitle
    The title of the top-level series for the current page.

AuthorsName

Blurb
    Valid in a series or series/story

Excerpt
    Valid in a series or series/story

URL
    Context-sensitive.  In a Story, refers to the URL used to access
    that story.  In a Next or Prev, refers to the URL of the next or
    previous story, respectively.  

SeriesURL

MainSeriesURL

AuthorsURL

# {block:Series}{URL}{Title}{Contents}{/block:Series}

# > Handle these first

Minus the actual content of a template, the HTML that we use to build
every page, a document tends to look like this:

{URL}
{SeriesTitle}
{AuthorName}
{AuthorDescription}

{block:IfSeries} 
    {Title}
    {Description}
    {block:TableOfContents}
        {block:Story}{URL}{Title}{/block:Story}
    {/block:TableOfContents}
{/block:IfSeries}

The important trick here is that the TableOfContents will be recursed
wherever the {Contents} block is seen, up to a maximum depth of four.
IfContents will be true if this is a subseries and there is content of
a subseries; the reason for this is to prevent the rendering of an
empty subseries.


{block:IfStory}
    {Title}
    {Body}
    {block:Next}{URL}{Title}{/block:Next}
    {block:Prev}{URL}{Title}{/block:Prev}
    {Pubdate}
    {block:IfLicense}{License}{/block:IfLicense}
    {Copyright}
{block:/IfStory}
    

