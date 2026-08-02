import React, { useEffect, useState } from 'react';
import apiService from '../../../api/api';
import { 
	HiOutlineEye, HiOutlinePencil, HiOutlineTrash, 
	HiAcademicCap as HiOutlineSearch, HiOutlineXMark, HiOutlinePlus,
	HiOutlinePhoto, HiOutlineChartBar, HiOutlineCheckBadge,
	HiOutlineGlobeAlt, HiOutlineArchiveBox
} from 'react-icons/hi2';

const initialForm = {
	category: '',
	title: '',
	thumbnail: null,
	body: '',
	is_featured: false,
	is_published: true,
};

const categories = [
	'news', 'interview', 'documentary', 'announcement', 'project',
];

const AdminContent = () => {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [showForm, setShowForm] = useState(false);
	const [form, setForm] = useState(initialForm);
	const [editId, setEditId] = useState(null);
	const [submitting, setSubmitting] = useState(false);
	// const [message, setMessage] = useState('');
	const [showDetails, setShowDetails] = useState(false);
	const [detailsPost, setDetailsPost] = useState(null);
	const [filterCategory, setFilterCategory] = useState('');
	const [search, setSearch] = useState('');

	const fetchPosts = async () => {
		setLoading(true);
		setError(null);
		try {
			let url = '/api/content/posts/';
			if (filterCategory) url += `?category=${encodeURIComponent(filterCategory)}`;
			const res = await apiService.get(url);
			setPosts(res.data);
		} catch (err) {
			setError('System failure while retrieving news feed.');
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchPosts();
	}, [filterCategory]);

	const handleChange = (e) => {
		const { name, value, type, checked, files } = e.target;
		if (type === 'checkbox') setForm(f => ({ ...f, [name]: checked }));
		else if (type === 'file') setForm(f => ({ ...f, [name]: files[0] }));
		else setForm(f => ({ ...f, [name]: value }));
	};

	const openForm = (post = null) => {
		if (post) {
			setForm({
				category: post.category || '',
				title: post.title || '',
				thumbnail: null,
				body: post.body || '',
				is_featured: post.is_featured || false,
				is_published: post.is_published || true,
			});
			setEditId(post.id);
		} else {
			setForm(initialForm);
			setEditId(null);
		}
		setShowForm(true);
	};

	const openDetails = async (postId) => {
		setShowDetails(true);
		setDetailsPost(null);
		try {
			const res = await apiService.get(`/api/content/posts/${postId}/`);
			setDetailsPost(res.data);
		} catch (err) {
			setDetailsPost({ error: 'Failed to fetch content preview.' });
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setSubmitting(true);
		const formData = new FormData();
		Object.keys(form).forEach(key => {
			if (key === 'thumbnail' && !form[key]) return;
			formData.append(key, form[key]);
		});

		try {
			if (editId) {
				await apiService.patch(`/api/content/posts/${editId}/`, formData, {
					headers: { 'Content-Type': 'multipart/form-data' },
				});
			} else {
				await apiService.post('/api/content/posts/', formData, {
					headers: { 'Content-Type': 'multipart/form-data' },
				});
			}
			setShowForm(false);
			fetchPosts();
		} catch (err) {
			alert('Submission failed. Check your connection.');
		} finally {
			setSubmitting(false);
		}
	};

	const handleDelete = async (id) => {
		if (!window.confirm('Delete this article permanently?')) return;
		try {
			await apiService.delete(`/api/content/posts/${id}/`);
			fetchPosts();
		} catch (err) {
			alert('Delete failed.');
		}
	};

	const filteredPosts = posts.filter(post =>
		(!search || post.title.toLowerCase().includes(search.toLowerCase()))
	);

	return (
		<div className="min-h-screen bg-[#f8fafc] py-10 px-4 sm:px-10">
			<div className="max-w-7xl mx-auto">
				
				{/* Header Control Panel */}
				<div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 gap-6">
					<div>
						<h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">
							Content <span className="text-red-600">Hub</span>
						</h1>
						<p className="text-slate-500 font-medium italic">Publishing news, interview, documentary, announcement and projects for Halala Media.</p>
					</div>

					<div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
						<div className="relative flex-1 sm:w-64">
							<HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
							<input
								type="text"
								placeholder="Search articles..."
								className="w-full pl-10 pr-4 py-3  bg-white border-none shadow-sm outline-none focus:ring-2 focus:ring-red-500 transition-all"
								value={search}
								onChange={e => setSearch(e.target.value)}
							/>
						</div>
						<select
							className="w-full sm:w-44 px-4 py-3  bg-white border-none shadow-sm outline-none focus:ring-2 focus:ring-red-500 text-slate-600 font-bold"
							value={filterCategory}
							onChange={e => setFilterCategory(e.target.value)}
						>
							<option value="">Category</option>
							{categories.map(cat => <option key={cat} value={cat}>{cat.toUpperCase()}</option>)}
						</select>
						<button
							onClick={() => openForm()}
							className="w-full sm:w-auto flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-black px-6 py-3  shadow-lg shadow-red-200 transition-all active:scale-95"
						>
							<HiOutlinePlus size={20} />
							<span>Create</span>
						</button>
					</div>
				</div>

				{/* Content List Area */}
				<div className="space-y-4">
					{loading ? (
						<div className="flex flex-col items-center justify-center py-20 animate-pulse">
							<div className="w-12 h-12 border-4 border-red-600 border-t-transparent  animate-spin mb-4" />
							<p className="text-slate-400 font-bold tracking-widest uppercase text-xs">Accessing Database...</p>
						</div>
					) : filteredPosts.length === 0 ? (
						<div className="text-center py-24 bg-white border-2 border-dashed border-slate-200">
							<HiOutlineArchiveBox size={60} className="mx-auto text-slate-200 mb-4" />
							<p className="text-slate-400 text-lg font-bold">No articles found in this section.</p>
						</div>
					) : (
						filteredPosts.map(post => (
							<div 
								key={post.id} 
								className="group bg-white hover:bg-slate-50 border border-slate-100 p-4  shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 transition-all"
							>
								{/* Thumbnail & Title */}
								<div className="flex items-center gap-6 w-full md:w-1/2">
									<div className="w-24 h-24 flex-shrink-0 bg-slate-100 overflow-hidden relative">
										{post.thumbnail ? (
											<img src={post.thumbnail} className="w-full h-full object-cover transition-transform group-hover:scale-110" alt="" />
										) : (
											<div className="w-full h-full flex items-center justify-center text-slate-300">
												<HiOutlinePhoto size={32} />
											</div>
										)}
									</div>
									<div className="overflow-hidden">
										<span className="text-[10px] font-black uppercase tracking-[0.2em] text-red-600 block mb-1">
											{post.category}
										</span>
										<h3 className="text-lg font-bold text-slate-800 line-clamp-2 leading-tight">
											{post.title}
										</h3>
									</div>
								</div>

								{/* Stats & Status */}
								<div className="flex items-center justify-between md:justify-around flex-1 w-full">
									<div className="flex flex-col items-center">
										<div className="flex items-center gap-1 text-slate-400 font-bold">
											<HiOutlineChartBar />
											<span>{post.views_count || 0}</span>
										</div>
										<p className="text-[10px] text-slate-300 uppercase">Readers</p>
									</div>

									<div className="flex flex-col items-center">
										{post.is_published ? (
											<div className="flex items-center gap-1 text-green-500 font-black text-xs uppercase">
												<HiOutlineGlobeAlt /> <span>Live</span>
											</div>
										) : (
											<div className="flex items-center gap-1 text-slate-300 font-black text-xs uppercase">
												<HiOutlineArchiveBox /> <span>Draft</span>
											</div>
										)}
										{post.is_featured && (
											<span className="text-[9px] bg-yellow-400 text-yellow-900 px-2  font-black mt-1">FEATURED</span>
										)}
									</div>
								</div>

								{/* Buttons */}
								<div className="flex items-center gap-2">
									<button onClick={() => openDetails(post.id)} className="p-4 text-slate-400 hover:text-red-600 hover:bg-red-50  transition-colors">
										<HiOutlineEye size={24} />
									</button>
									<button onClick={() => openForm(post)} className="p-4 text-slate-400 hover:text-red-600 hover:bg-red-50  transition-colors">
										<HiOutlinePencil size={24} />
									</button>
									<button onClick={() => handleDelete(post.id)} className="p-4 text-slate-400 hover:text-red-600 hover:bg-red-50  transition-colors">
										<HiOutlineTrash size={24} />
									</button>
								</div>
							</div>
						))
					)}
				</div>

				{/* Create/Edit Form Modal */}
				{showForm && (
					<div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
						<div className="bg-white w-full max-w-2xl max-h-[95vh] shadow-2xl relative overflow-hidden animate-in zoom-in slide-in-from-bottom-8 flex flex-col">
							{/* Sticky Close Button */}
							<button 
								onClick={() => setShowForm(false)} 
								className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 bg-slate-100 text-slate-400  hover:bg-red-600 hover:text-white transition-all z-20"
								aria-label="Close form"
							>
								<HiOutlineXMark size={24} />
							</button>
							{/* Scrollable Form Content */}
							<div className="flex-1 overflow-y-auto p-4 sm:p-10 pt-14 sm:pt-10">
								<div className="flex justify-between items-start mb-8">
									<h2 className="text-2xl sm:text-3xl font-black text-slate-900">
										{editId ? 'Revise Article' : 'Create Content'}
									</h2>
								</div>

								<form onSubmit={handleSubmit} className="space-y-4">
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<input 
											name="title" required placeholder="Article Headline" 
											value={form.title} onChange={handleChange}
											className="md:col-span-2 p-4 bg-slate-50  border-2 border-transparent focus:border-red-500 focus:bg-white outline-none font-bold"
										/>
										<select 
											name="category" value={form.category} onChange={handleChange} required
											className="p-4 bg-slate-50  border-2 border-transparent focus:border-red-500 outline-none font-bold"
										>
											<option value="">Choose Topic</option>
											{categories.map(cat => <option key={cat} value={cat}>{cat.toUpperCase()}</option>)}
										</select>
										<div className="relative p-4 bg-slate-50  flex items-center gap-2">
											<HiOutlinePhoto className="text-slate-400" />
											<input type="file" name="thumbnail" onChange={handleChange} className="text-xs font-bold text-slate-500 w-full file:hidden" />
										</div>
									</div>

									<textarea 
										name="body" required placeholder="Tell the story..." 
										value={form.body} onChange={handleChange}
										className="w-full p-4 bg-slate-50  border-2 border-transparent focus:border-red-500 focus:bg-white outline-none font-medium min-h-[180px]"
									/>

									<div className="flex gap-6 p-4 bg-slate-50 ">
										<label className="flex items-center gap-2 cursor-pointer group">
											<input type="checkbox" name="is_featured" checked={form.is_featured} onChange={handleChange} className="w-5 h-5 accent-red-600" />
											<span className="text-xs font-black uppercase text-slate-400 group-hover:text-red-600">Featured</span>
										</label>
										<label className="flex items-center gap-2 cursor-pointer group">
											<input type="checkbox" name="is_published" checked={form.is_published} onChange={handleChange} className="w-5 h-5 accent-red-600" />
											<span className="text-xs font-black uppercase text-slate-400 group-hover:text-red-600">Visible to Public</span>
										</label>
									</div>

									<button disabled={submitting} className="w-full py-5 bg-red-600 hover:bg-red-700 text-white font-black  shadow-xl shadow-red-200 transition-all">
										{submitting ? 'Syncing...' : editId ? 'Publish Updates' : 'Publish to Feed'}
									</button>
								</form>
							</div>
						</div>
					</div>
				)}

				{/* Details / Preview Modal */}
				{showDetails && (
					<div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-lg animate-in fade-in duration-300">
						<div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto relative animate-in zoom-in">
							<button onClick={() => setShowDetails(false)} className="fixed top-8 right-8 p-4 bg-white shadow-2xl  z-20">
								<HiOutlineXMark size={32} />
							</button>

							{detailsPost ? (
								<div className="pb-12">
									<div className="w-full h-80 relative">
										<img src={detailsPost.thumbnail} className="w-full h-full object-cover" alt="" />
										<div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
									</div>
									<div className="px-8 md:px-20 -mt-20 relative">
										<span className="px-4 py-1.5 bg-red-600 text-white  text-xs font-black uppercase tracking-widest">
											{detailsPost.category}
										</span>
										<h2 className="text-4xl md:text-5xl font-black text-slate-900 mt-6 leading-tight">
											{detailsPost.title}
										</h2>
										<div className="flex gap-4 mt-4 text-slate-400 text-sm font-bold">
											<span className="flex items-center gap-1"><HiOutlineEye /> {detailsPost.views_count} Views</span>
											<span>•</span>
											<span>{new Date(detailsPost.created_at).toLocaleDateString()}</span>
										</div>
										<hr className="my-8 border-slate-100" />
										<div className="text-slate-600 text-lg leading-relaxed whitespace-pre-line font-medium">
											{detailsPost.body}
										</div>
									</div>
								</div>
							) : (
								<div className="p-20 text-center">
									<div className="w-12 h-12 border-4 border-red-600 border-t-transparent  animate-spin mx-auto mb-4" />
									<p className="font-bold text-slate-400">Loading Preview...</p>
								</div>
							)}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default AdminContent;