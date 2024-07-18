{
    project.attributes.projectCoverPhoto && project.attributes.projectCoverPhoto.data && (
        <img
            className="project-navbar-photos"
            src={project.attributes.projectCoverPhoto.data.attributes.formats.thumbnail.url.startsWith('http')
                ? project.attributes.projectCoverPhoto.data.attributes.formats.thumbnail.url
                : `https://bold-animal-facf707bd9.strapiapp.com${project.attributes.projectCoverPhoto.data.attributes.formats.thumbnail.url}`}
            alt="Project Cover"
            onError={(e) => { console.log("Image Error:", e); }}
        />
    )
}
