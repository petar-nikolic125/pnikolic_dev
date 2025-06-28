//projects.tsx
import { useState, useMemo } from "react";
import { Link } from "wouter";
import { ArrowLeft, Search, ExternalLink, FileText } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { projects, technologies, availabilityOptions, typeOptions, categoryOptions } from "@/data/portfolio";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";

interface Filters {
    technology: string[];
    availability: string[];
    type: string[];
    category: string[];
}

export default function Projects() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filters, setFilters] = useState<Filters>({
        technology: [],
        availability: [],
        type: [],
        category: []
    });
    const [expandedFilters, setExpandedFilters] = useState({
        technology: true,
        availability: false,
        type: false,
        category: false
    });

    const filteredProjects = useMemo(() => {
        return projects.filter(project => {
            const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                project.description.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesTechnology = filters.technology.length === 0 ||
                filters.technology.some(tech => project.technologies.includes(tech));

            const matchesAvailability = filters.availability.length === 0 ||
                filters.availability.includes(project.availability);

            const matchesType = filters.type.length === 0 ||
                filters.type.includes(project.type);

            const matchesCategory = filters.category.length === 0 ||
                (project.category && filters.category.includes(project.category));

            return matchesSearch && matchesTechnology && matchesAvailability && matchesType && matchesCategory;
        });
    }, [searchTerm, filters]);

    const handleFilterChange = (filterType: keyof Filters, value: string, checked: boolean) => {
        setFilters(prev => ({
            ...prev,
            [filterType]: checked
                ? [...prev[filterType], value]
                : prev[filterType].filter(item => item !== value)
        }));
    };

    const clearAllFilters = () => {
        setFilters({
            technology: [],
            availability: [],
            type: [],
            category: []
        });
        setSearchTerm("");
    };

    const toggleFilterExpansion = (filterType: keyof typeof expandedFilters) => {
        setExpandedFilters(prev => ({
            ...prev,
            [filterType]: !prev[filterType]
        }));
    };

    const hasActiveFilters = filters.technology.length > 0 || filters.availability.length > 0 || filters.type.length > 0 || filters.category.length > 0 || searchTerm.length > 0;

    return (
        <div className="min-h-screen bg-gray-950 text-gray-100">
            <div className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="flex items-center justify-center mb-6">
                            <Link href="/">
                                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-100">
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Back to Home
                                </Button>
                            </Link>
                        </div>
                        <h1 className="font-serif font-bold text-4xl text-gray-100 mb-4">All Projects</h1>
                        <div className="max-w-lg mx-auto relative">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <Input
                                type="text"
                                placeholder="Search projects by name"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-12 h-12 bg-gray-800 border-gray-700 rounded-full text-gray-100 placeholder-gray-400 focus:border-navy"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Filters Sidebar */}
                        <div className="lg:w-60 flex-shrink-0">
                            <Card className="bg-gray-900 border-gray-800 sticky top-6">
                                <CardContent className="p-6">
                                    <h3 className="font-sans font-semibold text-lg text-gray-100 mb-6">Filters</h3>

                                    {/* Technology Filter */}
                                    <div className="mb-6">
                                        <Button
                                            variant="ghost"
                                            onClick={() => toggleFilterExpansion('technology')}
                                            className="flex items-center justify-between w-full text-left text-gray-100 font-medium mb-3 p-0 h-auto hover:bg-transparent"
                                        >
                                            <span>Technology</span>
                                            <span className={`transform transition-transform ${expandedFilters.technology ? 'rotate-180' : ''}`}>
                        ▼
                      </span>
                                        </Button>
                                        {expandedFilters.technology && (
                                            <div className="space-y-2 text-sm">
                                                {technologies.map(tech => (
                                                    <div key={tech} className="flex items-center space-x-2">
                                                        <Checkbox
                                                            id={`tech-${tech}`}
                                                            checked={filters.technology.includes(tech)}
                                                            onCheckedChange={(checked) =>
                                                                handleFilterChange('technology', tech, checked as boolean)
                                                            }
                                                            className="border-gray-600 data-[state=checked]:bg-navy data-[state=checked]:border-navy"
                                                        />
                                                        <label
                                                            htmlFor={`tech-${tech}`}
                                                            className="text-gray-300 hover:text-gray-100 cursor-pointer flex-1"
                                                        >
                                                            {tech}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* Availability Filter */}
                                    <div className="mb-6">
                                        <Button
                                            variant="ghost"
                                            onClick={() => toggleFilterExpansion('availability')}
                                            className="flex items-center justify-between w-full text-left text-gray-100 font-medium mb-3 p-0 h-auto hover:bg-transparent"
                                        >
                                            <span>Availability</span>
                                            <span className={`transform transition-transform ${expandedFilters.availability ? 'rotate-180' : ''}`}>
                        ▼
                      </span>
                                        </Button>
                                        {expandedFilters.availability && (
                                            <div className="space-y-2 text-sm">
                                                {availabilityOptions.map(option => (
                                                    <div key={option} className="flex items-center space-x-2">
                                                        <Checkbox
                                                            id={`avail-${option}`}
                                                            checked={filters.availability.includes(option)}
                                                            onCheckedChange={(checked) =>
                                                                handleFilterChange('availability', option, checked as boolean)
                                                            }
                                                            className="border-gray-600 data-[state=checked]:bg-navy data-[state=checked]:border-navy"
                                                        />
                                                        <label
                                                            htmlFor={`avail-${option}`}
                                                            className="text-gray-300 hover:text-gray-100 cursor-pointer flex-1"
                                                        >
                                                            {option}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* Type Filter */}
                                    <div className="mb-6">
                                        <Button
                                            variant="ghost"
                                            onClick={() => toggleFilterExpansion('type')}
                                            className="flex items-center justify-between w-full text-left text-gray-100 font-medium mb-3 p-0 h-auto hover:bg-transparent"
                                        >
                                            <span>Type</span>
                                            <span className={`transform transition-transform ${expandedFilters.type ? 'rotate-180' : ''}`}>
                        ▼
                      </span>
                                        </Button>
                                        {expandedFilters.type && (
                                            <div className="space-y-2 text-sm">
                                                {typeOptions.map(option => (
                                                    <div key={option} className="flex items-center space-x-2">
                                                        <Checkbox
                                                            id={`type-${option}`}
                                                            checked={filters.type.includes(option)}
                                                            onCheckedChange={(checked) =>
                                                                handleFilterChange('type', option, checked as boolean)
                                                            }
                                                            className="border-gray-600 data-[state=checked]:bg-navy data-[state=checked]:border-navy"
                                                        />
                                                        <label
                                                            htmlFor={`type-${option}`}
                                                            className="text-gray-300 hover:text-gray-100 cursor-pointer flex-1"
                                                        >
                                                            {option}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* Category Filter */}
                                    <div className="mb-6">
                                        <Button
                                            variant="ghost"
                                            onClick={() => toggleFilterExpansion('category')}
                                            className="flex items-center justify-between w-full text-left text-gray-100 font-medium mb-3 p-0 h-auto hover:bg-transparent"
                                        >
                                            <span>Category</span>
                                            <span className={`transform transition-transform ${expandedFilters.category ? 'rotate-180' : ''}`}>
                        ▼
                      </span>
                                        </Button>
                                        {expandedFilters.category && (
                                            <div className="space-y-2 text-sm">
                                                {categoryOptions.map(option => (
                                                    <div key={option} className="flex items-center space-x-2">
                                                        <Checkbox
                                                            id={`category-${option}`}
                                                            checked={filters.category.includes(option)}
                                                            onCheckedChange={(checked) =>
                                                                handleFilterChange('category', option, checked as boolean)
                                                            }
                                                            className="border-gray-600 data-[state=checked]:bg-navy data-[state=checked]:border-navy"
                                                        />
                                                        <label
                                                            htmlFor={`category-${option}`}
                                                            className="text-gray-300 hover:text-gray-100 cursor-pointer flex-1"
                                                        >
                                                            {option}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* Clear Filters */}
                                    <Button
                                        onClick={clearAllFilters}
                                        disabled={!hasActiveFilters}
                                        className="w-full py-2 px-4 bg-gray-800 text-gray-300 rounded border border-gray-700 hover:bg-gray-700 transition-colors duration-300 disabled:opacity-30"
                                    >
                                        Clear Filters
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Projects Table */}
                        <div className="flex-1">
                            <Card className="bg-gray-900 border-gray-800 overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-gray-800">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                                Project Name
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                                Technologies
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                                Category
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                                Links
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-800">
                                        {filteredProjects.length === 0 ? (
                                            <tr>
                                                <td colSpan={4} className="px-6 py-8 text-center text-gray-400">
                                                    No projects found matching your criteria.
                                                </td>
                                            </tr>
                                        ) : (
                                            filteredProjects.map((project, index) => (
                                                <tr
                                                    key={project.id}
                                                    className="hover:bg-gray-800/50 transition-colors duration-200"
                                                    style={{
                                                        backgroundColor: index % 2 === 0 ? 'rgba(31, 41, 55, 0.03)' : 'transparent'
                                                    }}
                                                >
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm font-medium text-gray-100">{project.name}</div>
                                                        <div className="text-sm text-gray-400">{project.description}</div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex flex-wrap gap-1">
                                                            {project.technologies.map(tech => (
                                                                <Badge
                                                                    key={tech}
                                                                    variant="secondary"
                                                                    className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded border border-gray-700"
                                                                >
                                                                    {tech}
                                                                </Badge>
                                                            ))}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {project.category && (
                                                            <Badge
                                                                variant="outline"
                                                                className="px-2 py-1 text-xs border-gray-600 text-gray-300"
                                                            >
                                                                {project.category}
                                                            </Badge>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                        <div className="flex space-x-3">
                                                            {project.liveUrl && (
                                                                <a
                                                                    href={project.liveUrl}
                                                                    className="text-gray-400 hover:text-gray-100 transition-colors"
                                                                    title="Live Site"
                                                                >
                                                                    <ExternalLink className="w-4 h-4" />
                                                                </a>
                                                            )}
                                                            {project.sourceUrl && (
                                                                <a
                                                                    href={project.sourceUrl}
                                                                    className="text-gray-400 hover:text-gray-100 transition-colors"
                                                                    title="Source Code"
                                                                >
                                                                    <SiGithub className="w-4 h-4" />
                                                                </a>
                                                            )}
                                                            {project.docsUrl && (
                                                                <a
                                                                    href={project.docsUrl}
                                                                    className="text-gray-400 hover:text-gray-100 transition-colors"
                                                                    title="Documentation"
                                                                >
                                                                    <FileText className="w-4 h-4" />
                                                                </a>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                        </tbody>
                                    </table>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
